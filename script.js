var myApp = angular.module('myApp', []);

    myApp.config(function ($routeProvider) {
        $routeProvider.when('/' ,{templateUrl:"table.html"}, "tableCtrl").
            when('/add', {templateUrl:"add.html"}, "addCtrl").
            when('/edit', {templateUrl:"edit.html"}, "editCtrl")
    });

   myApp.factory('Data', function() {
          var Data;
       return {
           getData: function () {
               return Data;
           },
           setData: function(value) {
               Data = value;
           }
       };
   });


//*****todos******
///Determine what value should be grabed from mongo when the user changes collection
//Document grab the collections from database
//make the functions more dynamic
//fix the edit and update functions on the back end
//add bootstrap



//Provides an Http resource to be injected into any controller that needs it.
function Controller($scope, $http) {
    //scope is all of the elements within the controller declared on the html





    $scope.getDbInfo = function () {
        var url = 'http://localhost:3000/mongo';
        console.log($scope.user.userId);
        $http({  method: 'get', url: url}).
            success(function (data, status, headers, config) {
                console.log(data);
                console.log('success');
            }).
            error(function (data, status, headers, config) {
                console.log('error');
            });
    };



    $scope.updateVaules = function () {
        //gather user data  then pass that data off to a service for the update controller to use.
        var url = 'http://localhost:3000/update';
        console.log($scope.user.userId);
        console.log($scope.user.password);
        $http({  method: 'Post', url: url, data: JSON.stringify($scope.user) }).
            success(function (data, status, headers, config) {
                console.log(data);
                console.log('success');
            }).
            error(function (data, status, headers, config) {
                console.log('error');
            });
    };
}

function tableCtrl($scope, $http, $location, Data)  {


    $scope.showVaules = function () {
        console.log("grabbing Values from the database...");
        $scope.users = [];
        var url = 'http://localhost:3000/users';
        //Http call
        $http({ method: 'GET', url: url }).
            success(function (data, status, headers, config) {
                ///data is the json from the api
                angular.forEach(data, function(user) {
                    //user is each javascript object which get posted to an array
                    //Example {userID:2, name:Austin}
                    $scope.users.push(user);
                    console.log(user);
                });
                console.log('success');


                //gets the headers for the table
                $scope.headers = [];
                for (var key in $scope.users[0]) {
                    if ( $scope.users[0].hasOwnProperty(key)) {

                        console.log('the header is ' + key);
                        $scope.headers.push(key);
                    }

                }
                $scope.headers.sort();
            }).
            error(function (data, status, headers, config) {
                console.log('error');
            });

        $scope.updateVaules = function (data) {
            Data.setData(data);
            console.log($scope.user);
            console.log(Data.getData());
            console.log(data);
            $location.path('/edit');
           // console.log($scope.user.password);
//            $http({  method: 'Post', url: url, data: JSON.stringify($scope.user) }).
//                success(function (data, status, headers, config) {
//                    console.log(data);
//                    console.log('success');
//                }).
//                error(function (data, status, headers, config) {
//                    console.log('error');
//                });
        };
    };

    $scope.removeItem = function (item){
        var index = $scope.users.indexOf(item);

        if (index > -1) {
            $scope.users.splice(index, 1);
        }

        $scope.deleteVaules(item);
    }

    $scope.deleteVaules = function (item) {
        var url = 'http://localhost:3000/delete';
        //console.log($scope.user.userId);
        $http({  method: 'Post', url: url, data: JSON.stringify(item) }).
            success(function (data, status, headers, config) {
                console.log(data);
                console.log('success');
            }).
            error(function (data, status, headers, config) {
                console.log('error');
            });
    };


}




function editCtrl($scope, $http, Data) {
    //insert values should be changed to the update value
    $scope.updateVaules = function () {
        var url = 'http://localhost:3000/update';
        console.log("about to update users");
        console.log(JSON.stringify(Data.getData()));

        $http({  method: 'Post', url: url, data: JSON.stringify(Data.getData()) }).
                success(function (data, status, headers, config) {
                    console.log(data);
                    console.log('success');
                }).
                error(function (data, status, headers, config) {
                    console.log('error');
                });

    };

    $scope.init = function () {
        console.log(Data);
        $scope.user = Data.getData();
    }

}

function addCtrl($scope, $http) {

    $scope.Write = function() {
        var url = 'http://localhost:3000/test2';
        $http({ method: 'Post', url: url, data: JSON.stringify($scope.user) }).
            success(function (data, status, headers, config) {
                console.log(data);
                console.log('success');
            }).
            error(function (data, status, headers, config) {
                console.log('error');
            });
    }

}



//Dunno if this controller is needed just need a way to figure out how to elegantly send the orginal user back to the data base
// as well as what the updated values should be.




