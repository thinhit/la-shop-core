/* Controllers */
idsCore
    .controller('group_news',['$scope','$http','growl','$modal',function($scope,$http,growl,$modal) {
        // $scope.group_news   = [];
        $scope.focusElement = 'name_focus';
        $scope.user = {
            name: 'awesome user'
          }; 
        $scope.list = function() {
            $scope.loading = true;
            $http({
                url     : base_url+'group_news',
                dataType: 'json'
                }).success(function (e){
                    $scope.loading = false;
                    $scope.group_news = e.data;
                    $scope.totalItems = e.total;
                    $scope.itemsPerPage = 10;
                    $scope.currentPage = 1;
                    $scope.maxSize = 5;
                    $scope.$watch('currentPage + itemsPerPage', function() {
                        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
                        var end = begin + $scope.itemsPerPage;

                        $scope.group_new = $scope.group_news.slice(begin, end);
                    });
                }).error(function (err){
                    console.log(err);
                });
        };
        $scope.list();
        $scope.delete = function(index,id) {
            $scope.loading = true;
            $scope.disable = true;
            $http({
                method  : 'POST',
                url     : base_url+'group_news/delete',
                data    : {id:id},
                dataType: 'json'
                }).success(function (result){
                    if(result.message == 'Done') {
                        growl.success("Delete a success !");
                        $scope.group_new.splice(index,1);
                        $scope.disable = false;
                        $scope.loading = false;
                    }
                }).error(function (err){
                    growl.warning("Error!");
                    console.log(err);
                });
        };
        var modalInstance;
        $scope.modalOpen_add = function (size) {
            modalInstance = $modal.open({
                templateUrl: 'views/admin/group_news/add.html',
                size: size,
                controller: function ($scope, $modalInstance, growl, $http) {
                    $scope.add_item = function() {
                        $scope.loading = true;
                        $scope.disable = true;
                        $http({
                            method  : 'POST',
                            url     : base_url+'group_news/post',
                            data    : {name:$scope.name},
                            dataType: 'json'
                            }).success(function (result){
                                if(result.message == 'Done') {
                                    $modalInstance.close(result.data);
                                    growl.success("This add a success !");
                                    $scope.disable = false;
                                    $scope.loading = false;
                                } else if(result.message == 'exits_data') {
                                    growl.warning("Name already exists!");
                                    $scope.loading = false;
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
                    $scope.keyPress = function(event) {
                        if (event.keyCode == 13) {
                            $scope.add_item();
                        }
                    }

                }
            });

            modalInstance.result.then(function (newItem) {
              $scope.group_new.push(newItem);
            }, function () {
              //$log.info('Modal dismissed at: ' + new Date());
            });
        };
        //add
        $scope.modalOpen_update = function (gr,size) {
            modalInstance = $modal.open({
                templateUrl: 'views/admin/group_news/edit.html',
                size: size,
                controller: function ($scope, $modalInstance, growl, $http) {
                    //list
                    $http({
                        method:'POST',
                        url  : base_url+'group_news/rows',
                        data : {id:gr.id},
                        dataType: 'json'
                        }).success(function (e){
                            $scope.row = e.data;
                        }).error(function (err){
                            console.log(err);
                        });
                    $scope.edit_item = function() {
                        $scope.loading = true;
                        $scope.disable = true;
                        $http({
                            method  : 'POST',
                            url     : base_url+'group_news/push',
                            data    : {id:gr.id,name:$scope.row.name},
                            dataType: 'json'
                            }).success(function (result){
                                if(result.message == 'Done') {
                                    $modalInstance.close(result.data);
                                    growl.success("This add a success !");
                                    $scope.disable = false;
                                    $scope.loading = false;
                                }
                            }).error(function (err){
                                growl.warning("Error!");
                                console.log(err);
                            });
                    };

                    $scope.ok = function () {
                        $scope.edit_item();
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.keyPress = function(event) {
                        if (event.keyCode == 13) {
                            $scope.edit_item();
                        }
                    }

                }
            });

            modalInstance.result.then(function (newItem) {
              //$scope.sinceId = newItem.gr.id;
              angular.extend(gr, newItem); 
            }, function () {
              //$log.info('Modal dismissed at: ' + new Date());
            });
        };

    }]); 



