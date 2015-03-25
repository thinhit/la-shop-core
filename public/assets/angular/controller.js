/* Controllers */
idsCore
    .controller('mainCtrl', [
        '$scope',
        function ($scope) {
        }
    ])
    .controller('styleSwitcher', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$modal',
        function ($rootScope,$scope,$timeout,$modal) {

            $scope.styleSwitcherToggle = false;
            $scope.toggleStyleSwitcher = function() {
                $scope.styleSwitcherToggle = !$scope.styleSwitcherToggle;
            }

            $rootScope.tbStyleActive = 'style_0';
            $scope.topBarColor = function(style) {
                $rootScope.topBarColor = 'topBar_' + style;
                $rootScope.tbStyleActive = style;
            }

            $rootScope.bgActive = 'bg_0';
            $scope.siteBg = function(bg) {
                $rootScope.siteBg = bg;
                $rootScope.bgActive = bg;
            }

            // layout switch
            $rootScope.fixedLayout = false;
            $('#fixed_layout_switch').on('change', function () {
                $rootScope.fixedLayout = !$rootScope.fixedLayout;
                $timeout(function() {
                    $(window).resize();
                })
            });

            // menu position
            /*$('#top_menu_switch').attr('checked',false).on('change', function () {*/
                $rootScope.topMenuAct = true;
                $rootScope.sideMenuAct = false;
                if(!$rootScope.sideNavCollapsed && !$rootScope.topMenuAct) {
                    $rootScope.createScrollbar();
                } else {
                    $rootScope.destroyScrollbar();
                }
                $timeout(function() {
                    $(window).resize();
                })
            /*});*/

            // hide breadcumbs
            $rootScope.hideBreadcrumbs = false;
            $('#breadcrumbs_switch').attr('checked',false).on('change', function () {
                $rootScope.hideBreadcrumbs = !$rootScope.hideBreadcrumbs;
            });


            $scope.showCSS = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'views/partials/bootstrapModalNoBtns.html',
                    size: 'lg',
                    controller: function ($scope, $modalInstance) {

                        $bodyClasses = $('body').attr('class');
                        $headerClasses = $('#main_header').attr('class');

                        $bodyClassesStr =
'// &lt;body&gt; classes'
+ '<br>&lt;body class="'+ $bodyClasses + '"&gt;...&lt;/body&gt;';

                        if($headerClasses != '') {
                            $headerClassesStr =
'<br><br>'
+ '// &lt;header&gt; classes'
+ '<br>&lt;header id="main_header" class="' + $headerClasses + '"&gt;...&lt;/header&gt;';
                        } else {
                            $headerClassesStr = '';
                        }

                        $scope.modalTitle = 'CSS classes';
                        $scope.modalContent =
'<pre>'
+ $bodyClassesStr
+ $headerClassesStr
+ '</pre>';

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };

                    }
                });
            };

        }
    ])
    .controller('sideMenuCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$stateParams',
        '$timeout',
        function ($rootScope, $scope, $state, $stateParams, $timeout) {
            $scope.sections = [
                {
                    id: 0,
                    title: 'Tổng quan',
                    icon: 'icon_house_alt first_level_icon',
                    link: 'auth.home'
                },
                {
                    id: 1,
                    title: 'Sản phẩm',
                    icon: 'icon_document_alt first_level_icon',
                    submenu_title: 'Forms',
                    submenu: [
                        {
                            title: 'Danh sách sản phẩm',
                            link: 'auth.product.list'
                        }
                    ]
                },
                {
                    id: 1,
                    title: 'Tin tức',
                    icon: 'icon_document_alt first_level_icon',
                    submenu_title: 'Forms',
                    submenu: [
                        {
                            title: 'Danh sách tin tức',
                            link: 'auth.news.list_news'
                        },
                        {
                            title: 'Nhóm tin tức',
                            link: 'auth.news.group_news'
                        }
                    ]
                },
                {
                    id: 99,
                    title: 'Cấu hình',
                    icon: '  icon_adjust-horiz first_level_icon',
                    link: 'auth.home'
                }

            ];

            // accordion menu
            $(document).off('click', '.side_menu_expanded #main_menu .has_submenu > a').on('click', '.side_menu_expanded #main_menu .has_submenu > a', function () {
                if($(this).parent('.has_submenu').hasClass('first_level')) {
                    var $this_parent = $(this).parent('.has_submenu'),
                        panel_active = $this_parent.hasClass('section_active');

                    if (!panel_active) {
                        $this_parent.siblings().removeClass('section_active').children('ul').slideUp('200');
                        $this_parent.addClass('section_active').children('ul').slideDown('200');
                    } else {
                        $this_parent.removeClass('section_active').children('ul').slideUp('200');
                    }
                } else {
                    var $submenu_parent = $(this).parent('.has_submenu'),
                        submenu_active = $submenu_parent.hasClass('submenu_active');

                    if (!submenu_active) {
                        $submenu_parent.siblings().removeClass('submenu_active').children('ul').slideUp('200');
                        $submenu_parent.addClass('submenu_active').children('ul').slideDown('200');
                    } else {
                        $submenu_parent.removeClass('submenu_active').children('ul').slideUp('200');
                    }
                }
            });

            $rootScope.createScrollbar = function() {
                $("#main_menu .menu_wrapper").mCustomScrollbar({
                    theme: "minimal-dark",
                    scrollbarPosition: "outside"
                });
            }

            $rootScope.destroyScrollbar = function() {
                $("#main_menu .menu_wrapper").mCustomScrollbar('destroy');
            }

            $timeout(function() {
                if(!$rootScope.sideNavCollapsed && !$rootScope.topMenuAct) {
                    if(!$('#main_menu .has_submenu').hasClass('section_active')) {
                        $('#main_menu .has_submenu .act_nav').closest('.has_submenu').children('a').click();
                    } else {
                        $('#main_menu .has_submenu.section_active').children('ul').show();
                    }
                    // init scrollbar
                    $rootScope.createScrollbar();
                }
            });
        }
    ])
    .controller('loginCtrl', [
        '$scope',
        '$timeout',
        function ($scope,$timeout) {
            $scope.loginForm = true;
            $scope.switchForm = function(form) {
                $scope.loginForm = !$scope.loginForm;
                $('.form_wrapper').removeClass('fadeInUpBig');
                $timeout(function() {
                    $('.form_wrapper').removeClass('fadeOutDownBig').hide();
                    $('#'+form).show().addClass('fadeInUpBig');
                },300)
            }
        }
    ])
    .controller('dashboardCtrl', [
        '$scope',
        'files',
        function ($scope, files) {
            // run scripts after state load
            $scope.$on('$stateChangeSuccess', function () {
                // init dashboard functions
                $scope.$watch('countries_data', function () {
                    countries_data = $scope.countries_data;
                    yukon_dashboard.init();
                });
            })

        }
    ])
    .controller('formExtendedCtrl', [
        '$scope',
        'files',
        'randomElementsList',
        'countriesList',
        '$timeout',
        function ($scope, files, randomElementsList, countriesList, $timeout) {

            $scope.randomElementsList = randomElementsList;
            $scope.countriesList = countriesList;

            $scope.$on('$stateChangeSuccess', function () {
                $scope.date_range = {
                    today: moment().format('MMMM D, YYYY'),
                    last_month: moment().subtract('M', 1).format('MMMM D, YYYY')
                };
                $timeout(function() {
                    // init form.extended_elements functions
                    yukon_extended_elements.init();
                })
            })
        }
    ])
    .controller('formValidationCtrl', [
        '$scope',
        'files',
        function ($scope, files) {
            $scope.$on('$stateChangeSuccess', function () {
                // init form.validation functions
                yukon_form_validation.init();
            })
        }
    ])
    .controller('formWizardCtrl', [
        '$scope',
        '$timeout',
        function ($scope, $timeout) {
            $scope.$on('$stateChangeSuccess', function () {
                // prism highlight
                Prism.highlightAll();
                // init form.extended_elements functions
                $timeout(function() { yukon_wizard.init(); },0);
            })
        }
    ])
    .controller('chatCtrl', [
        '$scope',
        'files',
        function ($scope, files) {
            $scope.$on('$stateChangeSuccess', function () {
                // init chat functions
                yukon_chat.send_msg();
            })
        }
    ])
    .controller('userListCtrl', [
        '$scope',
        'userLists',
        'files',
        '$window',
        function ($scope, userLists, files, $window) {
            $scope.userList = userLists;
            $scope.userListItems = $scope.userList.length;
            $scope.$on('onRepeatLast', function (scope, element, attrs) {
                $('#user_list').listnav({
                    filterSelector: '.ul_lastName',
                    includeNums: false,
                    removeDisabled: true,
                    showCounts: false,
                    onClick: function(letter) {
                        $scope.userListItems = $window.document.getElementsByClassName("listNavShow").length;
                        $scope.$apply();
                    }
                });
            });
        }
    ])
    .controller('userProfileCtrl', [
        '$scope',
        'files',
        function ($scope, files) {
            // run scripts after state change
            $scope.$on('$stateChangeSuccess', function () {
                yukon_user_profile.init();
            })
        }
    ])
    .controller('userProfile2Ctrl', [
        '$scope',
        function ($scope) {
            // run scripts after state change
            $scope.$on('$stateChangeSuccess', function () {
                yukon_user_profile.init();
            })
        }
    ])
    .controller('contactListCtrl', [
        '$scope',
        'contactList',
        'files',
        '$timeout',
        function ($scope, contactList, files, $timeout) {

            $scope.contactList = contactList;

            $scope.$on('onRepeatLast', function (scope, element, attrs) {
                var $grid = $('.contact_list');

                $grid.shuffle({
                    itemSelector: '.contact_item'
                });

                $('#contactList_sort').prop('selectedIndex', 0).on('change', function () {
                    var sort = this.value,
                        opts = {};

                    if (sort === 'company') {
                        opts = {
                            by: function ($el) {
                                return $el.data('company');
                            }
                        };
                    } else if (sort === 'company_desc') {
                        opts = {
                            reverse: true,
                            by: function ($el) {
                                return $el.data('company').toLowerCase();
                            }
                        };
                    } else if (sort === 'name') {
                        opts = {
                            by: function ($el) {
                                return $el.data('name').toLowerCase();
                            }
                        };
                    } else if (sort === 'name_desc') {
                        opts = {
                            reverse: true,
                            by: function ($el) {
                                return $el.data('name').toLowerCase();
                            }
                        };
                    }

                    // Sort elements
                    $grid.shuffle('sort', opts);
                });

                $('#contactList_filter').prop('selectedIndex', 0).on('change', function () {
                    var group = this.value;

                    // Filter elements
                    $grid.shuffle('shuffle', group);
                    $('#contactList_sort').prop('selectedIndex', 0);
                    $('#contactList_search').val('');
                });

                $('#contactList_search').val('').on('keyup', function () {
                    var uName = this.value;
                    if (uName.length > 1) {
                        $('#contactList_filter, #contactList_sort').prop('selectedIndex', 0);
                        // Filter elements
                        $grid.shuffle('shuffle', function ($el, shuffle) {
                            return $el.data('name').toLowerCase().indexOf(uName.toLowerCase()) >= 0;
                        });
                    } else {
                        $grid.shuffle('shuffle', $('#contactList_filter').val());
                    }
                });

            })

        }
    ])
    .controller('helpFaqCtrl', [
        '$scope',
        '$http',
        '$state',
        function ($scope, $http, $state) {
            // get data from json
            $http.get('data/faq_help.json')
                .success(function (data, status, headers, config) {
                    $scope.faq = data;
                    // get curent category id
                    $scope.$state = $state;
                    $scope.stateActive = $state.current.name;
                    angular.forEach($scope.faq, function (value, key) {
                        if (value.link == $scope.stateActive) {
                            $scope.catId = value.id;
                        }
                    });
                }).
                error(function (data, status, headers, config) {
                    console.log(status);
                });

            // get category id
            $scope.categoryId = function (id) {
                $scope.catId = id;
            }
        }
    ])
    .controller('invoicesCtrl', [
        '$scope',
        'files',
        function ($scope,files) {
            // generate qrcode
            $scope.$watch('qr_base_size', function () {
                $('#invoice_qrcode').css({'width': $scope.qr_base_size / 2, 'height': $scope.qr_base_size / 2}).qrcode({
                    render: 'canvas',
                    size: $scope.qr_base_size,
                    text: $scope.qr_text
                }).children('img').prop('title', $scope.qr_text);
            });
        }
    ])
    .controller('mailboxCtrl', [
        '$scope',
        '$http',
        '$state',
        '$stateParams',
        'files',
        'utils',
        function ($scope, $http, $state, $stateParams, files, utils) {

            // get data from json
            $http.get('data/mailbox.json')
                .success(function (data, status, headers, config) {
                    $scope.folders = data;

                    $scope.messageItem = [];
                    // get curent folder id
                    $scope.$state = $state;
                    $scope.stateActive = $state.current.name;
                    angular.forEach($scope.folders, function (value, key) {
                        if (value.link == $scope.stateActive) {
                            $scope.foldId = value.folderId;
                        }
                        if (value.showCount) {
                            $scope.countMessages = function (id) {
                                return $scope.folders[id]['messages'].length;
                            }
                        }
                    });
                }).
                error(function (data, status, headers, config) {
                    //console.log(status);
                });

            $scope.selectAll = [];
            $scope.checkAll = function (id) {
                if ($scope.selectAll[id]) {
                    $scope.selectAll[id] = false;
                } else {
                    $scope.selectAll[id] = true;
                }
                angular.forEach($scope.folders[id]['messages'], function (message) {
                    message.selected = $scope.selectAll[id];
                });
            };

            $scope.$on('onRepeatLast', function (scope, element, attrs) {
                $('#mailbox_table').footable({
                    toggleSelector: " > tbody > tr > td > span.footable-toggle"
                });
            });

            // get folder id
            $scope.folderId = function (id) {
                $scope.foldId = id;
            }

        }
    ])
    .controller('mailDetailsCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        'messageDetails',
        'utils',
        function ($scope, $state, $stateParams, messageDetails, utils) {
            $scope.messages = messageDetails;
            $scope.messageDetails = utils.findById($scope.messages, $stateParams.messageId);
        }
    ])
    .controller('galleryCtrl', [
        '$scope',
        'images',
        'files',
        function ($scope, images,files) {
            $scope.gallery = images;

            $scope.$on('onRepeatLast', function (scope, element, attrs) {
                $('.gallery_grid .img_wrapper').magnificPopup({
					type: 'image',
					gallery:{
						enabled: true,
						arrowMarkup: '<i title="%title%" class="el-icon-chevron-%dir% mfp-nav"></i>'
					},
                    image: {
                        titleSrc: function(item) {
                            return item.el.attr('title') + '<small>' + item.el.children(".gallery_image_tags").text() + '</small>';
                        }
                    },
					removalDelay: 500, //delay removal by X to allow out-animation
					callbacks: {
						beforeOpen: function() {
                            $('html').addClass('magnific-popup-open');
                            // just a hack that adds mfp-anim class to markup
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = 'mfp-zoom-in';
						},
                        close: function() {
                            $('html').removeClass('magnific-popup-open');
                        }
					},
                    retina: {
                        ratio: 2
                    },
					closeOnContentClick: true,
					midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
				});
            });

        }
    ])
    .controller('notificationsPopupsCtrl', [
        '$scope',
        '$modal',
        'growl',
        function ($scope, $modal, growl) {

            // bootstrap modals
            $scope.modalOpen = function (size) {
                var modalInstance = $modal.open({
                    templateUrl: 'views/partials/bootstrapModal.html',
                    size: size,
                    controller: function ($scope, $modalInstance) {

                        $scope.modalTitle = 'Modal Title';
                        $scope.modalContent = '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p><p>Architecto autem, eligendi enim est et illum ipsam laboriosam magni minima molestiae perferendis placeat quae unde&hellip;</p>';

                        $scope.ok = function () {
                            $modalInstance.close();
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };

                    }
                });
            };

            // growl
            $scope.basicUsage = function (type) {
                var config = {};
                switch (type) {
                    case "success":
                        growl.success("<b>I'm</b> a success message", config);
                        break;
                    case "info":
                        growl.info("I'm an info message", config);
                        break;
                    case "warning":
                        growl.warning("I'm the warning message", config);
                        break;
                    default:
                        growl.error("Ups, error message here!", config);
                }
            }

            // get comment id
            $scope.getCommentId = function(id) {
                $scope.commentId = id;
            };

            // jBox
            $scope.$on('$stateChangeSuccess', function () {
                new jBox('Modal', {
                    width: 340,
                    height: 180,
                    attach: $('#jbox_modal_drag'),
                    draggable: 'title',
                    closeButton: 'title',
                    title: 'Click here to drag me around',
                    content: 'You can move this modal window'
                });

                new jBox('Confirm', {
                    closeButton: false,
                    confirmButton: 'Yes',
                    cancelButton: 'No',
                    _onOpen: function() {
                        // Set the new action for the submit button
                        this.submitButton
                            .off('click.jBox-Confirm' + this.id)
                            .on('click.jBox-Confirm' + this.id, function() {
                                new jBox('Notice', {
                                    offset: {
                                        y: 36
                                    },
                                    content: 'Comment deleted: id='+$scope.commentId
                                });
                                this.close();
                            }.bind(this));
                    }
                });

                $scope.jBoxNotice_def = function() {
                    new jBox('Notice', {
                        offset: {
                            y: 36
                        },
                        stack: false,
                        autoClose: 30000,
                        animation: {
                            open: 'slide:top',
                            close: 'slide:right'
                        },
                        onInit: function () {
                            this.options.content = 'Default notification';
                        }
                    })
                };

                $scope.jBoxNotice_audio = function() {
                    new jBox('Notice', {
                        attributes: {
                            x: 'right',
                            y: 'bottom'
                        },
                        theme: 'NoticeBorder',
                        color: 'green',
                        audio: 'assets/lib/jBox-0.3.0/Source/audio/bling2',
                        volume: '100',
                        stack: false,
                        autoClose: 3000,
                        animation: {
                            open: 'slide:bottom',
                            close: 'slide:left'
                        },
                        onInit: function () {
                            this.options.title = 'Title';
                            this.options.content = 'Notification with audio effect';
                        }
                    })
                };

                $scope.jBoxNotice_audio_50 = function() {
                    new jBox('Notice', {
                        attributes: {
                            x: 'right',
                            y: 'top'
                        },
                        offset: {
                            y: 36
                        },
                        theme: 'NoticeBorder',
                        color: 'blue',
                        audio: 'assets/lib/jBox-0.3.0/Source/audio/beep2',
                        volume: '60',
                        stack: false,
                        autoClose: 3000,
                        animation: {
                            open: 'slide:top',
                            close: 'slide:right'
                        },
                        onInit: function () {
                            this.options.title = 'Title';
                            this.options.content = 'Volume set to 60%';
                        }
                    })
                };

            });
        }
    ])
    .controller('bootstrapUICtrl', [
        '$scope',
        '$modal',
        function ($scope,$modal) {
            // accordions
            $scope.oneAtATime = true;

            $scope.groups = [
                {
                    title: 'Dynamic Group Header - 1',
                    content: 'Dynamic Group Body - 1'
                },
                {
                    title: 'Dynamic Group Header - 2',
                    content: 'Dynamic Group Body - 2'
                }
            ];

            $scope.items = ['Item 1', 'Item 2', 'Item 3'];

            $scope.addItem = function () {
                var newItemNo = $scope.items.length + 1;
                $scope.items.push('Item ' + newItemNo);
            };

            $scope.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };

            // alerts
            $scope.alerts = [
                { type: 'danger', msg: '<strong>Oh snap!</strong> Change a few <a class="alert-link">things</a> up and try submitting again.' },
                { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
            ];

            $scope.addAlert = function () {
                var alertType = ['warning','success','info','danger'];
                $scope.alerts.push({ type: alertType[Math.floor(Math.random() * alertType.length)], msg: 'Another alert!' });
            };

            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };

            // dropdowns
            $scope.toggled = function(open) {
                console.log('Dropdown is now: ', open);
            };
            $scope.toggleDropdown = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isopen = !$scope.status.isopen;
            };

            // bootstrap modals
            $scope.modalOpen = function (size) {
                var modalInstance = $modal.open({
                    templateUrl: 'views/partials/bootstrapModal.html',
                    size: size,
                    controller: function ($scope, $modalInstance) {

                        $scope.modalTitle = 'Modal Title';
                        $scope.modalContent = '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p><p>Architecto autem, eligendi enim est et illum ipsam laboriosam magni minima molestiae perferendis placeat quae unde&hellip;</p>';

                        $scope.ok = function () {
                            $modalInstance.close();
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };

                    }
                });
            };

            // pagination
            $scope.totalItems = 64;
            $scope.currentPage = 4;

            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function() {
                console.log('Page changed to: ' + $scope.currentPage);
            };

            $scope.maxSize = 5;
            $scope.bigTotalItems = 175;
            $scope.bigCurrentPage = 1;

            // tooltip
            $scope.dynamicTooltip = 'Hello, World!';
            $scope.dynamicTooltipText = 'dynamic';
            $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';

            // tabs
            $scope.tabs = [
                { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
                { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
            ];
            $scope.alertMe = function () {
                alert('You\'ve selected the alert tab!');
            };

        }
    ])
    
;




