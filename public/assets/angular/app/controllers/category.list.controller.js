/* Controllers */
idsCore
    .controller('category',['$scope','$http','growl','$modal',function($scope,$http,growl,$modal) {
        $scope.focusElement = 'name_focus';
        $scope.user = {
            name: 'awesome user'
        };
         $scope.list = function() {
            $scope.loading = true;
            $http({
                url     : base_url+'category',
                dataType: 'json'
                }).success(function (e){
                    $scope.loading    = false;
                    $scope.group_new  = e.data;
                }).error(function (err){
                    console.log(err);
                });
        };
        $scope.list();
        $scope.delete = function(currentNode) {
            if(currentNode.children != '' && currentNode.hasOwnProperty('children')) {
                growl.warning("vui lòng xóa hết dữ liệu bên trong trước!");
            } else {
                $scope.loading = true;
                $scope.disable = true;
                $http({
                    method  : 'POST',
                    url     : base_url+'category/delete',
                    data    : {id:currentNode.id},
                    dataType: 'json'
                    }).success(function (result){
                        if(result.message == 'Done') {
                            growl.success("Xóa thành công !");
                            $scope.disable = false;
                            $scope.loading = false;
                            $scope.list();
                        }
                    }).error(function (err){
                        growl.warning("Error!");
                        console.log(err);
                    });    
            }
            
        };
        var modalInstance;
        $scope.modalOpen_add = function (currentNode,index,size) {
            modalInstance = $modal.open({
                templateUrl: 'views/admin/category/add.html',
                size: size,
                controller: function ($scope, $modalInstance, growl, $http) {
                    $scope.add_item = function() {
                        var par = "";
                        if(typeof currentNode !='undefined') {
                            par = currentNode.id;
                        }
                        var _parId = par || 0;    
                        $scope.loading = true;
                        $scope.disable = true;
                        $http({
                            method  : 'POST',
                            url     : base_url+'category/post',
                            data    : {name:$scope.name,parent_id:_parId},
                            dataType: 'json'
                            }).success(function (result){
                                if(result.message == 'Done') {
                                    var config = {};
                                    $modalInstance.close(result.data);
                                    growl.success("Thêm mới thành công !",{disableCountDown: true});
                                    $scope.disable = false;
                                    $scope.loading = false;
                                } else if(result.message == 'exits_data') {
                                    growl.warning("Tên đã tồn tại!");
                                    $scope.loading = false;
                                } else if(result.message == 'null') {
                                    growl.warning("Yêu cập nhập tên!");
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
              $scope.list();
            }, function () {
              //$log.info('Modal dismissed at: ' + new Date());
            });
        };
        //add
        $scope.modalOpen_update = function (currentNode,size) {
            modalInstance = $modal.open({
                templateUrl: 'views/admin/category/edit.html',
                size: size,
                controller: function ($scope, $modalInstance, growl, $http) {
                    $scope.row = currentNode;
                    $scope.edit_item = function() {
                        $scope.loading = true;
                        $scope.disable = true;
                        $http({
                            method  : 'POST',
                            url     : base_url+'category/push',
                            data    : {id:currentNode.id,name:$scope.row.name},
                            dataType: 'json'
                            }).success(function (result){
                                if(result.message == 'Done') {
                                    $modalInstance.close(result.data);
                                    growl.success("Chỉnh sửa thành công!");
                                    $scope.disable = false;
                                    $scope.loading = false;
                                } else if(result.message == 'exits_data') {
                                    growl.warning("Tên đã tồn tại!");
                                    $scope.loading = false;
                                } else if(result.message == 'null') {
                                    growl.warning("Yêu cầu nhập tên!");
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



