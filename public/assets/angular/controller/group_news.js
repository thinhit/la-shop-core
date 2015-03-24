/* Controllers */
idsCore
    .controller('group_news',function($scope,$timeout) {
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


    }); 



