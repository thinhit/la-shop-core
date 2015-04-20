"use strict";
idsCore
    .controller('NewsListController', [
        '$scope','$http', '$restful','$modal', 'FileUploader', 'CSRF_TOKEN',  function ($scope, $http, $restful, $modal, FileUploader, CSRF_TOKEN) {

        	$scope.list_data = [];
            
            console.log(123);
        	$scope.loadPage = function (){
        		$http.get(base_url + 'news').success(function (resp){
        			console.log(resp)
        		}).error(function (err){
        			console.log(err);
        		})
        	}
        	$scope.loadPage();

            var modalInstance;
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
                                        growl.warning("tiêu đề đã tồn tại!");
                                        $scope.loading = false;
                                    } else if(result.message == 'null') {
                                        growl.warning("Tiêu đề không được để trống!");
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

        }
    ])