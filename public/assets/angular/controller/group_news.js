/* Controllers */
idsCore
    .controller('group_news',function($scope,$timeout, $http) {
        $scope.group_news = [];
        $.ajax({
            url:base_url+'group_news/viewall',
            dataType:'json',
            success:function(e) {
                $timeout(function() {
                    $scope.group_news = e.data;
                });
            }
        });
        $scope.delete = function(index,id) {
            $.ajax({
                url:base_url+'group_news/delete',
                data:'id='+id,
                dataType:'json',
                success:function(suc) {
                    $timeout(function() {
                        if(suc.message == 'Done') {
                            $scope.group_news.splice(index,id);
                        }
                    });
                }
            });
        };

        $scope.add_item = function() {
            $http({
                method  : 'POST',
                url     : base_url+'group_news/post',
                data    : {name:'Dao cho'},
                dataType: 'json'
              }).success(function (result){
                    console.log(result);
                }).error(function (err){
                    console.log(err);
                });

            
            /*$.ajax({
                type:'POST',
                url:base_url+'group_news/post',
                data:{data:'name=tran cong dao'},
                dataType:'json',

                async: true,
                success:function(s) {
                    console.log(s);
                },
                error:function(err) {
                    console.log(err);
                }
            });*/
        };

    }); 



