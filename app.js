'use strict'

var app = angular.module('myApp', []);

app.controller('myController', function($scope, $http) {


    // TABLE SORTING
    $scope.tableToSort = '';
    $scope.reverse = true;
    $scope.sortTable = function(tableToSort) {
        $scope.reverse = ($scope.tableToSort === tableToSort) ? !$scope.reverse : false;
        $scope.tableToSort = tableToSort;
    };

    // HTTP GET SEARCH WORD
    $scope.myFunction = function() {

        //SEARCH INPUT
        $scope.myInput = document.getElementById("userInput").value

        // REPLACE SPACES WITH '%' FOR URL STRING
        $scope.myInputFormated = $scope.myInput.replace(/\s/g, "%");

        var url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords"
            + "&SERVICE-VERSION=1.0.0"
            + "&SECURITY-APPNAME=AndersPe-bc85-43f3-a6eb-cd798e682cc6"
            + "&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD"
            + "&keywords="+$scope.myInputFormated
            + "&paginationInput.entriesPerPage=100"
            + "&callback=JSON_CALLBACK";

        $http.jsonp(url).then(function (response) {
            $scope.myData = response.data.findItemsByKeywordsResponse[0].searchResult[0]
            console.log($scope.myData);
        });
    };
});
