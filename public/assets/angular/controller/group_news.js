/* Controllers */
idsCore
    .controller('group_news',function($scope,$timeout, $http) {
        $scope.group_news = [];
        $http({
            url     : base_url+'group_news/viewall',
            dataType: 'json'
            }).success(function (e){
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
                        $scope.group_news.splice(index,id);
                    }
                }).error(function (err){
                    console.log(err);
                });
        };

        $scope.add_item = function() {
            $http({
                method  : 'POST',
                url     : base_url+'group_news/post',
                data    : {name:'test'},
                dataType: 'json'
                }).success(function (result){
                    if(result.message == 'Done') {
                        $scope.group_news.push(result.data);
                    }
                }).error(function (err){
                    console.log(err);
                });
        };

    }); 



