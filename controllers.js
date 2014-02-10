/* Controllers */

angular.module('myApp.controllers', []).
    controller('mainCtrl', [ '$scope', '$http',function($scope, $http){
        $scope.getDbInfo = function () {
            var url = 'http://localhost:3000/mongo';
            $http({  method: 'get', url: url}).
                success(function (data, status, headers, config) {
                    console.log(data);
                    console.log('success');
                }).
                error(function (data, status, headers, config) {
                    console.log('error');
                });
        };
    }])
    .controller('tableCtrl', ['$scope', '$http', '$location', 'Data', function ( $scope, $http, $location, Data){

        $scope.showVaules = function () {
            console.log("grabbing Values from the database...");
            $scope.users = [];
            var url = 'http://localhost:3000/users';

            //Gets JSON from the api
            $http({ method: 'GET', url: url }).
                success(function (data, status, headers, config) {

                    angular.forEach(data, function(user) {
                        //every user/document is stored into an array

                        $scope.users.push(user);
                        console.log(user);
                    });
                    console.log('success');


                    //gets key from each key/value pair in the object
                    //these keys will be shown as the tables headers
                    $scope.headers = [];
                    for (var key in $scope.users[0]) {
                        if ( $scope.users[0].hasOwnProperty(key)) {

                            console.log('the header is ' + key);
                            $scope.headers.push(key);
                        }

                    }
                    //Sorts the array to match angulars alphabetic order
                    $scope.headers.sort();
                }).
                error(function (data, status, headers, config) {
                    console.log('error');

                });

            //this function gives the Service data so the edit controller can have user information
            $scope.updateVaules = function (data) {
                Data.setData(data);
                console.log($scope.user);
                console.log(Data.getData());
                console.log(data);
                $location.path('/edit');//changes the url to trigger the user template

            };
        };

        //Removes item from local table
        $scope.removeItem = function (item){
            var index = $scope.users.indexOf(item);

            if (index > -1) {
                $scope.users.splice(index, 1);
            }
            //Delete value from the database
            $scope.deleteVaules(item);
        }

        $scope.deleteVaules = function (item) {
            var url = 'http://localhost:3000/users/' + item._id;
            console.log('url is'  + url);
            $http({  method: 'Delete', url: url, data: JSON.stringify(item) }).
                success(function (data, status, headers, config) {
                    console.log(data);
                    console.log('success');
                }).
                error(function (data, status, headers, config) {
                    console.log('error');
                });
        };

    }])
    .controller('editCtrl', ['$scope', '$http', '$location', 'Data', function editCtrl($scope, $http, $location, Data) {
            //insert values should be changed to the update value
            $scope.updateVaules = function () {
                var data = Data.getData();
                var url = 'http://localhost:3000/users/' + data._id;
                console.log("url is " + url);
                console.log(JSON.stringify(data));

                $http({  method: 'Put', url: url, data: JSON.stringify(Data.getData()) }).
                    success(function (data, status, headers, config) {
                        console.log(data);
                        console.log('success');
                        $location.path('/');//returns user to edit table

                    }).
                    error(function (data, status, headers, config) {
                        console.log('error');
                    });

            };

            $scope.init = function () {
                console.log(Data);
                $scope.user = Data.getData();
            }
    }])

    .controller('addCtrl', ['$scope', '$http', '$location', 'Data', function addCtrl($scope, $http, $location, Data) {
        $scope.Write = function() {
            var url = 'http://localhost:3000/users/';
            $http({ method: 'Post', url: url, data: JSON.stringify($scope.user) }).
                success(function (data, status, headers, config) {
                    console.log(data);
                    console.log('success');
                    $location.path('/');//returns user to edit table
                }).
                error(function (data, status, headers, config) {
                    console.log('error');
                });
        }
    }]);













