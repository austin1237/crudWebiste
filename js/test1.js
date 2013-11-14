function Test1Ctrl($scope, $http) {
  $scope.tests = [];

  var url = 'http://localhost:3000/test1';

  $scope.get = function () {
    $http({ method: 'GET', url: url }).
      success(function (data, status, headers, config) {
        angular.forEach(data, function(tests) {
          $scope.tests.push(test1);
          console.log(test1);
        });
        console.log(data);
        console.log('success');
      }).
      error(function (data, status, headers, config) {
        console.log('error');
      });
  };
}