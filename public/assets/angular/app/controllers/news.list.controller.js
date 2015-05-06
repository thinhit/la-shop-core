// "use strict";
idsCore
    .controller('NewsListController', [
        '$scope','$http', '$restful','$modal','growl', 'FileUploader', 'CSRF_TOKEN',  function ($scope, $http, $restful, $modal,growl, FileUploader, CSRF_TOKEN) {
            $scope.list_data    = [];
            $scope.currentPage  = 1;
            $scope.itemsPerPage = 10; 
            $scope.change_status = function(list) {
                $scope.loading = true;
                $scope.disable = true;
                var data = {status:list.status,id:list.id};
                $http({
                    method  : 'POST',
                    url     : base_url+'news/changestatus',
                    data    : data,
                    dataType: 'json'
                    }).success(function (result){
                        if(result.message == 'Done') {
                            growl.success("Thay đổi thành công !",{disableCountDown: true});
                            $scope.disable = false;
                            $scope.loading = false;
                            angular.extend(list, result.data);
                        }
                    }).error(function (err){
                        growl.warning("Error!");
                        console.log(err);
                    });
            }
        	$scope.loadPage = function (stt){
               var stt = stt || "";
        		$http.get(base_url + 'news?limit='+$scope.itemsPerPage+'&page='+$scope.currentPage+'&stt='+stt).success(function (resp){
                    $scope.list_data  = resp.data;
                    if(stt =='') {
                        $scope.totalItems = resp.total;    
                    } else {
                        $scope.totalItems = 1;    
                    }
                    $scope.maxSize    = 5;
        		}).error(function (err){
        			console.log(err);
        		})
        	}
        	$scope.loadPage();
            // select status 
            $scope.filterTable = function(stt) {
                $scope.loadPage(stt);
            }

            var modalInstance;
            //add
            $scope.modalOpen_add = function (size) {
                $scope.news = {};
                modalInstance = $modal.open({
                    templateUrl: 'views/admin/news/add.html',
                    size: size,
                    controller: function ($scope, $modalInstance, growl, $http, FileUploader, CSRF_TOKEN) {
                        /*Upload file images*/ 
                        $scope.news = {};
                        var uploader = $scope.uploader = new FileUploader({
                            url         : base_url + 'upload',
                            alias       : 'newsFile',
                            formData    : [
                                {
                                    key : 'request'
                                }
                            ],
                            headers     :{'X-CSRF-TOKEN' : CSRF_TOKEN }
                        });

                        uploader.filters.push({
                            name: 'customFilter',
                            fn: function(item, options) {
                                return this.queue.length < 2;
                            }
                        });

                        uploader.onAfterAddingFile = function(fileItem) {
                            uploader.uploadAll();
                        };

                        uploader.onCompleteItem = function(fileItem, response, status, headers) {
                            if(!response.error){
                                $scope.news.images = response.data;
                            }
                        };
            
                        $scope.groupnews =  function() {
                            $http.get(base_url+ 'news/groupnews').success(function(resp){
                                $scope.grs = resp.data;
                            }).error(function(err){
                                console.log(err);
                            })    
                        }
                        $scope.groupnews();
                        $scope.add_item = function() {
                            $scope.loading = true;
                            $scope.disable = true;
                            var data = {name:$scope.name,category:$scope.news.category,images:$scope.news.images,des:$scope.des,content:$scope.compose_message};
                            $http({
                                method  : 'POST',
                                url     : base_url+'news/post',
                                data    : data,
                                dataType: 'json'
                                }).success(function (result){
                                    if(result.message == 'Done') {
                                        var config = {};
                                        $modalInstance.close(result.data);
                                        growl.success("Thêm mới thành công !",{disableCountDown: true});
                                        $scope.disable = false;
                                        $scope.loading = false;
                                    } else if(result.message == 'exits_data') {
                                        growl.warning("tiêu đề đã tồn tại!",{disableCountDown: true});
                                        $scope.loading = false;
                                    } else if(result.message == 'null') {
                                        growl.warning("Tiêu đề không được để trống!",{disableCountDown: true});
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
                  $scope.list_data.unshift(newItem);
                  $scope.totalItems++;
                }, function () {
                  //$log.info('Modal dismissed at: ' + new Date());
                });
            };
            //edit
            $scope.modalOpen_update = function (rs,index,size) {
                $scope.news = {};
                modalInstance = $modal.open({
                    templateUrl: 'views/admin/news/edit.html',
                    size: size,
                    controller: function ($scope, $modalInstance, growl, $http, FileUploader, CSRF_TOKEN) {
                        /*Upload file images*/ 
                        $scope.news = {};
                        $scope.row = rs;
                        $scope.news.images = rs.images;
                        var uploader = $scope.uploader = new FileUploader({
                            url         : base_url + 'upload',
                            alias       : 'newsFile',
                            formData    : [
                                {
                                    key : 'request'
                                }
                            ],
                            headers     :{'X-CSRF-TOKEN' : CSRF_TOKEN }
                        });

                        uploader.filters.push({
                            name: 'customFilter',
                            fn: function(item, options) {
                                return this.queue.length < 2;
                            }
                        });

                        uploader.onAfterAddingFile = function(fileItem) {
                            uploader.uploadAll();
                        };

                        uploader.onCompleteItem = function(fileItem, response, status, headers) {
                            if(!response.error){
                                $scope.news.images = response.data;
                            }
                        };
            
                        $scope.groupnews =  function() {
                            $http.get(base_url+ 'news/groupnews').success(function(resp){
                                $scope.grs = resp.data;
                            }).error(function(err){
                                console.log(err);
                            })    
                        }
                        $scope.groupnews();
                        $scope.edit_item = function() {
                            $scope.loading = true;
                            $scope.disable = true;
                            var data = {id:rs.id,name:$scope.row.name,category:$scope.row.group_news_id,images:$scope.news.images,des:$scope.row.description,content:$scope.row.content};
                            $http({
                                method  : 'POST',
                                url     : base_url+'news/push',
                                data    : data,
                                dataType: 'json'
                                }).success(function (result){
                                    if(result.message == 'Done') {
                                        var config = {};
                                        $modalInstance.close(result.data);
                                        growl.success("Chỉnh sửa thành công !",{disableCountDown: true});
                                        $scope.disable = false;
                                        $scope.loading = false;
                                    } else if(result.message == 'null') {
                                        growl.warning("Tiêu đề không được để trống!",{disableCountDown: true});
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
                    angular.extend(rs, newItem); 
                }, function () {
                  //$log.info('Modal dismissed at: ' + new Date());
                });
            };
            //del
            $scope.delete = function(index,id) {
                if(confirm("Bạn muốn xóa chuyên mục này ?")){
                    $scope.loading = true;
                    $scope.disable = true;
                    $http({
                        method  : 'POST',
                        url     : base_url+'news/delete',
                        data    : {id:id},
                        dataType: 'json'
                        }).success(function (result){
                            if(result.message == 'Done') {
                                growl.success("Xóa thành công tin tức !");
                                $scope.disable = false;
                                $scope.loading = false;
                                $scope.loadPage();
                            }else {
                                growl.warning("Lỗi kết nối server, vui lòng thử lại sau  !",{disableCountDown: true});    
                            }
                        }).error(function (err){
                            growl.warning("Lỗi kết nối server, vui lòng thử lại sau !",{disableCountDown: true});
                            console.log(err);
                        });
                }
            };
        }
    ])