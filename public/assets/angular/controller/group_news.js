/* Controllers */
idsCore
    .controller('group_news',['$scope','$http','growl','$modal',function($scope,$http,growl,$modal) {
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
            $scope.disable = true;
            $http({
                method  : 'POST',
                url     : base_url+'group_news/delete',
                data    : {id:id},
                dataType: 'json'
                }).success(function (result){
                    if(result.message == 'Done') {
                        growl.success("Delete a success !");
                        $scope.group_news.splice(index,id);
                        $scope.disable = false;
                    }
                }).error(function (err){
                    growl.warning("Error!");
                    console.log(err);
                });
        };
        var modalInstance;
        $scope.modalOpen = function (size) {
            modalInstance = $modal.open({
                templateUrl: 'views/bootstrapModal.html',
                size: size,
                controller: function ($scope, $modalInstance, growl, $http) {


                    $scope.add_item = function() {
                        $scope.disable = true;
                        $http({
                            method  : 'POST',
                            url     : base_url+'group_news/post',
                            data    : {name:$scope.name},
                            dataType: 'json'
                            }).success(function (result){
                                if(result.message == 'Done') {
                                    //$scope.group_news.push(result.data);
                                    $modalInstance.close(result.data);
                                    growl.success("This add a success !");
                                    $scope.disable = false;
                                }
                            }).error(function (err){
                                growl.warning("Error!");
                                console.log(err);
                            });
                    };

                    $scope.ok = function () {
                        $scope.add_item();
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                }
            });

            modalInstance.result.then(function (newItem) {
              $scope.group_news.push(newItem);
            }, function () {
              //$log.info('Modal dismissed at: ' + new Date());
            });
        };

    }]); 



