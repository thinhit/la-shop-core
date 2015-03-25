"use strict";
angular.module('idsCore')
    .controller('NewsListController', [
        '$scope','$http', '$restful', function ($scope, $http, $restful) {

        	$scope.list_data = [];

        	$scope.loadPage = function (){
        		$http.get(base_url + 'news').success(function (resp){
        			console.log(resp)
        		}).error(function (err){
        			console.log(err);
        		})
        	}
        	$scope.loadPage();
        }
    ])