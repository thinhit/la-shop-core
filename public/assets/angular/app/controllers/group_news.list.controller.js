/* Controllers */
idsCore
    .controller('group_news',['$scope','$http','growl','$modal',function($scope,$http,growl,$modal) {
        $scope.focusElement = 'name_focus';
        $scope.user = {
            name: 'awesome user'
          };
        $scope.currentPage  = 1;
        $scope.itemsPerPage = 10; 
        $scope.list = function() {
            $scope.loading = true;
            $http({
                url     : base_url+'group_news?limit='+$scope.itemsPerPage+'&page='+$scope.currentPage,
                dataType: 'json'
                }).success(function (e){
                    $scope.loading    = false;
                    $scope.group_new  = e.data;
                    $scope.totalItems = e.total;
                    $scope.maxSize    = 5;
                }).error(function (err){
                    console.log(err);
                });
        };
        $scope.list();
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
                                    var config = {};
                                    $modalInstance.close(result.data);
                                    growl.success("This add a success !",{disableCountDown: true});
                                    $scope.disable = false;
                                    $scope.loading = false;
                                } else if(result.message == 'exits_data') {
                                    growl.warning("Name already exists!");
                                    $scope.loading = false;
                                } else if(result.message == 'null') {
                                    growl.warning("Name not null!");
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
              $scope.group_new.unshift(newItem);
              $scope.totalItems++;
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
                    $scope.row = gr;
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
                                    growl.success("This edit a success !");
                                    $scope.disable = false;
                                    $scope.loading = false;
                                } else if(result.message == 'exits_data') {
                                    growl.warning("Name already exists!");
                                    $scope.loading = false;
                                } else if(result.message == 'null') {
                                    growl.warning("Name not null!");
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

        $scope.delete = function(index,id) {
            if(confirm("Bạn muốn xóa chuyên mục này ?")){
                $scope.loading = true;
                $scope.disable = true;
                $http({
                    method  : 'POST',
                    url     : base_url+'group_news/delete',
                    data    : {id:id},
                    dataType: 'json'
                    }).success(function (result){
                        if(result.message == 'Done') {
                            growl.success("Xóa thành công chuyên mục !");
                            $scope.group_new.splice(index,1);
                            $scope.disable = false;
                            $scope.loading = false;
                            $scope.list();
                        }else {
                            growl.warning("Lỗi kết nối server, vui lòng thử lại sau  !");    
                        }
                    }).error(function (err){
                        growl.warning("Lỗi kết nối server, vui lòng thử lại sau !");
                        console.log(err);
                    });
            }
        };

    }]); 



