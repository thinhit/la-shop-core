/* Controllers */
idsCore
    .controller('group_news',['$scope','$http','growl',function($scope,$http,growl) {
        $scope.group_news = [];
        $scope.loading = true;
        
        $http({
            url     : base_url+'group_news/viewall',
            dataType: 'json'
            }).success(function (e){
                $scope.loading = false;
                $scope.group_news = e.data;
            }).error(function (err){
                console.log(err);
            });

        $scope.delete = function(index,id) {
            $http({
                method  : 'POST',
                url     : base_url+'group_news/delete',
                data    : {id:id},
                dataType: 'json'
                }).success(function (result){
                    if(result.message == 'Done') {
                        growl.success("Delete a success !");
                        $scope.group_news.splice(index,id);
                    }
                }).error(function (err){
                    growl.warning("Error!");
                    console.log(err);
                });
        };

        $scope.add_item = function() {
            $http({
                method  : 'POST',
                url     : base_url+'group_news/post',
                data    : {name:$scope.name},
                dataType: 'json'
                }).success(function (result){
                    if(result.message == 'Done') {
                        $scope.group_news.push(result.data);
                        growl.success("This add a success !");
                    }
                }).error(function (err){
                    growl.warning("Error!");
                    console.log(err);
                });
        };

    }]); 



