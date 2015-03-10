angular.module('idsCore')
    .controller('productListController', [
        '$scope','$http',
        function ($scope, $http) {

        	$http.get('api/v1/group_news/viewall').success(function (result){
        		$scope.datasource = result.data;
        	})
        }
    ])