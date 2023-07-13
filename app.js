// MODULE
var angularApp = angular.module("angularApp", []);

// CONTROLLERS
angularApp.controller("mainController", [
  "$scope",
  "$filter",
  function ($scope, $filter) {
    $scope.handle = "";

    $scope.handleLowerCase = function () {
      console.log("triggered");
      return $filter("lowercase")($scope.handle);
    };

    $scope.characters = 5;
    $scope.rules = [
      {
        rulename: "Must be 5 characters",
      },
      {
        rulename: "Must not be used elsewhere",
      },
      {
        rulename: "Must be cool",
      },
      {
        rulename: "Must be interesting",
      },
    ];
  },
]);
