function ScenarioCtrl($scope, $http) {
  $scope.scenarios = [];

  var url = 'http://localhost:3000/scenarios';

  $scope.get = function () {
    $http({ method: 'GET', url: url }).
      success(function (data, status, headers, config) {
        angular.forEach(data, function(scenario) {
          $scope.scenarios.push(scenario);
          console.log(scenario);
        });
        console.log(data);
        console.log('success');
      }). 
      error(function (data, status, headers, config) {
        console.log('error');
      });
  };
}

