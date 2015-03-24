/* Controllers */
idsCore
    .controller('group_news',function($scope,$timeout) {
        var base_url = 'http://localhost:8000/api/v1/group_news/viewall';
        $scope.group_news = [];
        $.ajax({
            url:base_url,
            dataType:'json',
            success:function(e) {
                $timeout(function() {
                    $scope.group_news = e.data;
                });
            }
        });


    }); 



