//***todos***
//Determine what value should be grabbed from mongo when the user changes collection
//Document grab the collections from database
//make the functions more dynamic
//fix the edit and update functions on the back end
//sets up the application

var myApp = angular.module('myApp', []);


//Determines what gets loaded into ng-view for each url the client visits
//***todos***
//**make this restful

myApp.config(function ($routeProvider) {
    $routeProvider.when('/' ,{templateUrl:"table.html"}, "tableCtrl").
        when('/add', {templateUrl:"add.html"}, "addCtrl").
        when('/edit', {templateUrl:"edit.html"}, "editCtrl")
});

//This service is used to pass data between controllers
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




//Provides an Http resource to be injected into any controller that needs it.
function mainCtrl($scope, $http) {
    //scope is all of the elements within the controller declared on the html

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


}

//Gets loaded when user clicks reads
function tableCtrl($scope, $http, $location, Data)  {


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




function editCtrl($scope, $http, $location, Data) {
    //insert values should be changed to the update value
    $scope.updateVaules = function () {
        var url = 'http://localhost:3000/update';
        console.log("about to update users");
        console.log(JSON.stringify(Data.getData()));

        $http({  method: 'Post', url: url, data: JSON.stringify(Data.getData()) }).
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




