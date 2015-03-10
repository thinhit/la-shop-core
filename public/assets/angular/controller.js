/* Controllers */
yukonApp
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
            $('#top_menu_switch').attr('checked',false).on('change', function () {
                $rootScope.topMenuAct = !$rootScope.topMenuAct;
                $rootScope.sideMenuAct = !$rootScope.sideMenuAct;
                if(!$rootScope.sideNavCollapsed && !$rootScope.topMenuAct) {
                    $rootScope.createScrollbar();
                } else {
                    $rootScope.destroyScrollbar();
                }
                $timeout(function() {
                    $(window).resize();
                })
            });

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
                    title: 'Dashboard',
                    icon: 'icon_house_alt first_level_icon',
                    link: 'auth.home'
                },
                {
                    id: 1,
                    title: 'Forms',
                    icon: 'icon_document_alt first_level_icon',
                    submenu_title: 'Forms',
                    submenu: [
                        {
                            title: 'Regular Elements',
                            link: 'auth.forms.regular_elements'
                        },
                        {
                            title: 'Extended Elements',
                            link: 'auth.forms.extended_elements'
                        },
                        {
                            title: 'Gridforms',
                            link: 'auth.forms.gridform'
                        },
                        {
                            title: 'Validation',
                            link: 'auth.forms.validation'
                        },
                        {
                            title: 'Wizard',
                            link: 'auth.forms.wizard'
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Pages',
                    icon: 'icon_folder-alt first_level_icon',
                    badge: true,
                    submenu_title: 'Pages',
                    submenu: [
                        {
                            title: 'Chat',
                            link: 'auth.pages.chat'
                        },
                        {
                            title: 'Contact List',
                            link: 'auth.pages.contactList'
                        },
                        {
                            title: 'Error 404',
                            link: 'error.404'
                        },
                        {
                            title: 'Help/Faq',
                            link: 'auth.pages.helpFaq.all'
                        },
                        {
                            title: 'Invoices',
                            link: 'auth.pages.invoices'
                        },
                        {
                            title: 'Login Page',
                            link: 'login'
                        },
                        {
                            title: 'Login Page 2',
                            link: 'login2'
                        },
                        {
                            title: 'Mailbox',
                            link: 'auth.pages.mail.inbox'
                        },
                        {
                            title: 'Mailbox (compose)',
                            link: 'auth.pages.mail.compose'
                        },
                        {
                            title: 'Search Page',
                            link: 'auth.pages.search'
                        },
                        {
                            title: 'User List',
                            link: 'auth.pages.userList'
                        },
                        {
                            title: 'User Profile',
                            link: 'auth.pages.userProfile'
                        },
                        {
                            title: 'User Profile 2',
                            link: 'auth.pages.userProfile2'
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'Components',
                    icon: 'icon_puzzle first_level_icon',
                    submenu_title: 'Components',
                    submenu: [
                        {
                            title: 'Gallery',
                            link: 'auth.components.gallery'
                        },
                        {
                            title: 'Grid',
                            link: 'auth.components.grid'
                        },
                        {
                            title: 'Icons',
                            link: 'auth.components.icons'
                        },
                        {
                            title: 'Notifications/Popups',
                            link: 'auth.components.notificationsPopups'
                        },
                        {
                            title: 'UI Bootstrap',
                            link: 'auth.components.bootstrapUI'
                        },
                        {
                            title: 'Typography',
                            link: 'auth.components.typography'
                        }

                    ]
                },
                {
                    id: 4,
                    title: 'Plugins',
                    icon: 'icon_lightbulb_alt first_level_icon',
                    badge: true,
                    submenu_title: 'Plugins',
                    submenu: [
                        {
                            title: 'Ace Editor',
                            link: 'auth.plugins.aceEditor'
                        },
                        {
                            title: 'Calendar',
                            link: 'auth.plugins.calendar.basic'
                        },
                        {
                            title: 'Charts',
                            link: 'auth.plugins.charts'
                        },
                        {
                            title: 'Gantt Chart',
                            link: 'auth.plugins.ganttChart'
                        },
                        {
                            title: 'Google Maps',
                            link: 'auth.plugins.googleMaps'
                        },
                        {
                            title: 'Tables',
                            link: 'auth.plugins.tables.footable'
                        },
                        {
                            title: 'Vector Maps',
                            link: 'auth.plugins.vectorMaps'
                        }
                    ]
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
    .controller('aceEditorCtrl', [
        '$scope',
        function ($scope) {

            $scope.aceThemes = [
                { theme: "chrome", name: "Chrome", group: "Bright" },
                { theme: "clouds", name: "Clouds", group: "Bright", group: "Bright" },
                { theme: "crimson_editor", name: "Crimson Editor", group: "Bright" },
                { theme: "dawn", name: "Dawn", group: "Bright" },
                { theme: "dreamweaver", name: "Dreamweaver", group: "Bright" },
                { theme: "eclipse", name: "Eclipse", group: "Bright" },
                { theme: "github", name: "GitHub", group: "Bright" },
                { theme: "solarized_light", name: "Solarized Light", group: "Bright" },
                { theme: "textmate", name: "TextMate", group: "Bright" },
                { theme: "tomorrow", name: "Tomorrow", group: "Bright" },
                { theme: "xcode", name: "XCode", group: "Bright" },
                { theme: "kuroir", name: "Kuroir", group: "Bright" },
                { theme: "katzenmilch", name: "KatzenMilch", group: "Bright" },
                { theme: "ambiance", name: "Ambiance", group: "Dark" },
                { theme: "chaos", name: "Chaos", group: "Dark" },
                { theme: "clouds_midnight", name: "Clouds Midnight", group: "Dark" },
                { theme: "cobalt", name: "Cobalt", group: "Dark" },
                { theme: "idle_fingers", name: "idle Fingers", group: "Dark" },
                { theme: "kr_theme", name: "krTheme", group: "Dark" },
                { theme: "merbivore", name: "Merbivore", group: "Dark" },
                { theme: "merbivore_soft", name: "Merbivore Soft", group: "Dark" },
                { theme: "mono_industrial", name: "Mono Industrial", group: "Dark" },
                { theme: "monokai", name: "Monokai", group: "Dark" },
                { theme: "pastel_on_dark", name: "Pastel on dark", group: "Dark" },
                { theme: "solarized_dark", name: "Solarized Dark", group: "Dark" },
                { theme: "terminal", name: "Terminal", group: "Dark" },
                { theme: "tomorrow_night", name: "Tomorrow Night", group: "Dark" },
                { theme: "tomorrow_night_blue", name: "Tomorrow Night Blue", group: "Dark" },
                { theme: "tomorrow_night_bright", name: "Tomorrow Night Bright", group: "Dark" },
                { theme: "tomorrow_night_eighties", name: "Tomorrow Night 80s", group: "Dark" },
                { theme: "twilight", name: "Twilight", group: "Dark" },
                { theme: "vibrant_ink", name: "Vibrant Ink", group: "Dark" }
            ];

            $scope.aceFontSize = [
                { fSize: "11", name: "11px" },
                { fSize: "12", name: "12px" },
                { fSize: "13", name: "13px" },
                { fSize: "14", name: "14px" },
                { fSize: "15", name: "15px" },
                { fSize: "16", name: "16px" }
            ];


            var editor = ace.edit("aceEditor");
            $('#aceEditor').data('editor', editor);
            editor.setTheme("ace/theme/monokai");
            document.getElementById('aceEditor').style.fontSize='14px';
            editor.getSession().setMode("ace/mode/javascript");
            editor.setShowPrintMargin(false);
            editor.setOptions({maxLines: 32});
            editor.setAutoScrollEditorIntoView(true);

            // change theme
            $scope.changeTheme = function (theme) {
                $('#aceEditor').data('editor').setTheme("ace/theme/"+theme);
            };

            // change font size
            $scope.changeFontSize = function (fSize) {
                document.getElementById('aceEditor').style.fontSize=fSize+'px';
            };

        }
    ])
    .controller('calendarBasicCtrl', [
        '$scope',
        function ($scope) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            $('#calendar').fullCalendar({
                header: {
                    center: 'title',
                    left: 'month,agendaWeek,agendaDay today',
                    right: 'prev,next'
                },
                buttonIcons: {
                    prev: ' el-icon-chevron-left',
                    next: ' el-icon-chevron-right'
                },
                editable: true,
                aspectRatio: 2.2,
                events: [
                    {
                        title: 'All Day Event',
                        start: new Date(y, m, 1)
                    },
                    {
                        title: 'Long Event',
                        start: new Date(y, m, d - 5),
                        end: new Date(y, m, d - 2)
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: new Date(y, m, d - 3, 16, 0)
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: new Date(y, m, d + 4, 16, 0)
                    },
                    {
                        title: 'Meeting',
                        start:  new Date(y, m, d + 1, 19, 0),
                        end:  new Date(y, m, d + 1, 22, 30)
                    },
                    {
                        title: 'Lunch',
                        start: new Date(y, m, d - 7)
                    },
                    {
                        title: 'Birthday Party',
                        start: new Date(y, m, d + 10)
                    },
                    {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: new Date(y, m, d + 12)
                    }
                ],
                eventAfterAllRender: function() {
                    $('.fc-header .fc-button-prev').html('<span class="el-icon-chevron-left"></span>');
                    $('.fc-header .fc-button-next').html('<span class="el-icon-chevron-right"></span>');
                }
            });

        }
    ])
    .controller('calendarLunarCtrl', [
        '$scope',
        function ($scope) {

            $('#calendar_phases').fullCalendar({
                header: {
                    center: 'title',
                    left: 'month,agendaWeek,agendaDay today',
                    right: 'prev,next'
                },
                buttonIcons: false,
                aspectRatio: 2.2,
                // Phases of the Moon
                events: 'https://www.google.com/calendar/feeds/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic',
                eventClick: function(event) {
                    // opens events in a popup window
                    window.open(event.url, 'gcalevent', 'width=700,height=600');
                    return false;
                },
                eventAfterAllRender: function() {
                    $('.fc-header .fc-button-prev').html('<span class="el-icon-chevron-left"></span>');
                    $('.fc-header .fc-button-next').html('<span class="el-icon-chevron-right"></span>');
                }
            });

        }
    ])
    .controller('chartsCtrl', [
        '$scope',
        function ($scope) {

            // cobined chart
            var c3_combined_chart = c3.generate({
                bindto: '#c3_combined',
                data: {
                    columns: [
                        ['data1', 30, 20, 50, 40, 60, 50],
                        ['data2', 200, 130, 90, 240, 130, 220],
                        ['data3', 200, 130, 90, 240, 130, 220],
                        ['data4', 130, 120, 150, 140, 160, 150],
                        ['data5', 90, 70, 20, 50, 60, 120],
                    ],
                    type: 'bar',
                    types: {
                        data3: 'line',
                        data5: 'area',
                    },
                    groups: [
                        ['data1','data2']
                    ]
                },
                point: {
                    r: '4',
                    focus: {
                        expand: {
                            r: '5'
                        }
                    }
                },
                bar: {
                    width: {
                        ratio: 0.4 // this makes bar width 50% of length between ticks
                    }
                },
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                },
                color: {
					pattern: ['#ff7f0e', '#2ca02c', '#9467bd', '#1f77b4', '#d62728']
				}
            });

            // gauge chart
            var chart_gauge = c3.generate({
                bindto: '#c3_gauge',
                data: {
                    columns: [
                        ['data', 91.4]
                    ],
                    type: 'gauge',
                    onclick: function (d, i) { /*console.log("onclick", d, i);*/ },
                    onmouseover: function (d, i) { /*console.log("onmouseover", d, i);*/ },
                    onmouseout: function (d, i) { /*console.log("onmouseout", d, i);*/ }
                },
                gauge: {
                    width: 39
                },
                color: {
                    pattern: ['#ff0000', '#f97600', '#f6c600', '#60b044'],
                    threshold: {
                        values: [30, 60, 90, 100]
                    }
                }
            });

            setTimeout(function () {
                chart_gauge.load({
                    columns: [['data', 10]]
                });
            }, 2000);
            setTimeout(function () {
                chart_gauge.load({
                    columns: [['data', 50]]
                });
            }, 3000);
            setTimeout(function () {
                chart_gauge.load({
                    columns: [['data', 70]]
                });
            }, 4000);
            setTimeout(function () {
                chart_gauge.load({
                    columns: [['data', 0]]
                });
            }, 5000);
            setTimeout(function () {
                chart_gauge.load({
                    columns: [['data', 100]]
                });
            }, 6000);

            // donut chart
            var chart_donut = c3.generate({
                bindto: '#c3_donut',
                data: {
                    columns: [
                        ['data1', 30],
                        ['data2', 120],
                    ],
                    type : 'donut',
                    onclick: function (d, i) { console.log("onclick", d, i); },
                    onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                    onmouseout: function (d, i) { console.log("onmouseout", d, i); }
                },
                donut: {
                    title: "Iris Petal Width"
                }
            });
            setTimeout(function () {
                chart_donut.load({
                    columns: [
                        ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                        ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                        ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
                    ]
                });
            }, 2500);
            setTimeout(function () {
                chart_donut.unload({
                    ids: 'data1'
                });
                chart_donut.unload({
                    ids: 'data2'
                });
            }, 4500);

            // grid lines
            var chart_grid_lines = c3.generate({
                bindto: '#c3_grid_lines',
                data: {
                    columns: [
                        ['sample', 30, 200, 100, 400, 150, 250],
                        ['sample2', 1300, 1200, 1100, 1400, 1500, 1250],
                    ],
                    axes: {
                        sample2: 'y2'
                    }
                },
                axis: {
                    y2: {
                        show: true
                    }
                },
                grid: {
                    y: {
                        lines: [{value: 50, text: 'Label 50'}, {value: 1300, text: 'Label 1300', axis: 'y2'}]
                    }
                }
            });

            // scatter plot
            var chart_scatter = c3.generate({
                bindto: '#c3_scatter',
                data: {
                    xs: {
                        setosa: 'setosa_x',
                        versicolor: 'versicolor_x',
                    },
                    // iris data from R
                    columns: [
                        ["setosa_x", 3.5, 3.0, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3.0, 3.0, 4.0, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3.0, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3.0, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3.0, 3.8, 3.2, 3.7, 3.3],
                        ["versicolor_x", 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2.0, 3.0, 2.2, 2.9, 2.9, 3.1, 3.0, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3.0, 2.8, 3.0, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3.0, 3.4, 3.1, 2.3, 3.0, 2.5, 2.6, 3.0, 2.6, 2.3, 2.7, 3.0, 2.9, 2.9, 2.5, 2.8],
                        ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                        ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                    ],
                    type: 'scatter'
                },
                axis: {
                    x: {
                        label: 'Sepal.Width',
                        tick: {
                            fit: false
                        }
                    },
                    y: {
                        label: 'Petal.Width'
                    }
                }
            });

            setTimeout(function () {
                chart_scatter.load({
                    xs: {
                        virginica: 'virginica_x'
                    },
                    columns: [
                        ["virginica_x", 3.3, 2.7, 3.0, 2.9, 3.0, 3.0, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3.0, 2.5, 2.8, 3.2, 3.0, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3.0, 2.8, 3.0, 2.8, 3.8, 2.8, 2.8, 2.6, 3.0, 3.4, 3.1, 3.0, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3.0, 2.5, 3.0, 3.4, 3.0],
                        ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
                    ]
                });
            }, 1000);

            setTimeout(function () {
                chart_scatter.unload({
                    ids: 'setosa'
                });
            }, 2000);

            setTimeout(function () {
                chart_scatter.load({
                    columns: [
                        ["virginica", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                    ]
                });
            }, 3000);

            $(window).on("debouncedresize", function() {
                c3_combined_chart.resize();
                chart_gauge.resize();
                chart_donut.resize();
                chart_grid_lines.resize();
                chart_scatter.resize();
            });

        }
    ])
    .controller('ganttChartCtrl', [
        '$scope',
        function ($scope) {

            var ganttData = [
                {
                    id: 1,
                    name: "Concept",
                    color: '#006064',
                    series: [
                        {
                            name: "Brainstorm<span>1 Jan - 3 Jan</span>",
                            start: new Date('01/01/2015'),
                            end: new Date('01/03/2015'),
                            color: "#0097a7"
                        },
                        {
                            name: "Wireframes<span>4 Jan - 7 Jan</span>",
                            start: new Date('01/04/2015'),
                            end: new Date('01/07/2015'),
                            color: "#00bcd4"
                        },
                        {
                            name: "Concept description<span>6 Jan - 10 Jan</span>",
                            start: new Date('01/06/2015'),
                            end: new Date('01/10/2015'),
                            color: "#4dd0e1"
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Design",
                    series: [
                        {
                            name: "Sketching<span>8 Jan - 16 Jan</span>",
                            start: new Date('01/08/2015'),
                            end: new Date('01/16/2015'),
                            color: "#f57c00"
                        },
                        {
                            name: "Photography<span>10 Jan - 16 Jan</span>",
                            start: new Date('01/10/2015'),
                            end: new Date('01/16/2015'),
                            color: "#fb8c00"
                        },
                        {
                            name: "Feedback<span>19 Jan - 21 Jan</span>",
                            start: new Date('01/19/2015'),
                            end: new Date('01/21/2015'),
                            color: "#ff9800"
                        },
                        {
                            name: "Final Design<span>21 Jan - 27 Jan</span>",
                            start: new Date('01/21/2015'),
                            end: new Date('01/27/2015'),
                            color: "#ffa726"
                        }
                    ]
                },
                {
                    id: 3,
                    name: "Implementation",
                    series: [
                        {
                            name: "Specifications<span>26 Jan - 2 Feb</span>",
                            start: new Date('01/26/2015'),
                            end: new Date('02/06/2015'),
                            color: "#689f38"
                        },
                        {
                            name: "Templates<span>4 Feb - 10 Feb</span>",
                            start: new Date('02/04/2015'),
                            end: new Date('02/10/2015'),
                            color: "#7cb342"
                        },
                        {
                            name: "Database<span>5 Feb - 13 Feb</span>",
                            start: new Date('02/05/2015'),
                            end: new Date('02/13/2015'),
                            color: "#8bc34a"
                        },
                        {
                            name: "Integration<span>16 Feb - 10 Mar</span>",
                            start: new Date('02/16/2015'),
                            end: new Date('03/10/2015'),
                            color: "#9ccc65"
                        }
                    ]
                },
                {
                    id: 4,
                    name: "Testing & Delivery",
                    series: [
                        {
                            name: "Focus Group<span>17 Mar - 27 Mar</span>",
                            start: new Date('03/17/2015'),
                            end: new Date('03/27/2015'),
                            color: "#1976d2"
                        },
                        {
                            name: "Stress Test<span>25 Mar - 6 Apr</span>",
                            start: new Date('03/25/2015'),
                            end: new Date('04/06/2015'),
                            color: "#2196f3"
                        },
                        {
                            name: "Delivery<span>7 Apr - 8 Apr</span>",
                            start: new Date('04/07/2015'),
                            end: new Date('04/08/2015'),
                            color: "#64b5f6"
                        }
                    ]
                }
            ];

            $("#ganttChart").ganttView({
				data: ganttData,
				behavior: {
					onClick: function (data) {
						var msg = "You clicked on an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
						console.log(msg);
					},
					onResize: function (data) {
						var msg = "You resized an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
						console.log(msg);
					},
					onDrag: function (data) {
						var msg = "You dragged an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
						console.log(msg);
					}
				}
			});

        }
    ])
    .controller('gmapsCtrl', [
        '$scope',
        function ($scope) {

            // basic google maps
            new GMaps({
                div: '#gmap_basic',
                lat: -12.043333,
                lng: -77.028333
            });

            // with markers
            map_markers = new GMaps({
                el: '#gmap_markers',
                lat: 51.500902,
                lng: -0.124531
            });
            map_markers.addMarker({
                lat: 51.497714,
                lng: -0.12991,
                title: 'Westminster',
                details: {
                    // You can attach additional information, which will be passed to Event object (e) in the events previously defined.
                },
                click: function(e){
                    alert('You clicked in this marker');
                },
                mouseover: function(e){
                    if(console.log) console.log(e);
                }
            });
            map_markers.addMarker({
                lat: 51.500891,
                lng: -0.123347,
                title: 'Westminster Bridge',
                infoWindow: {
                    content: '<div class="infoWindow_content"><p>Westminster Bridge is a road and foot traffic bridge over the River Thames...</p><a href="http://en.wikipedia.org/wiki/Westminster_Bridge" target="_blank">wikipedia</a></div>'
                }
            });

            // static map
            if(window.devicePixelRatio >= 2) {
                var img_scale = '&scale=2'
                    background_size = 'background-size: 640px 640px;';

            } else {
                var img_scale = '',
                background_size = '';
            }
            url = GMaps.staticMapURL({
                size: [640, 640],
                lat: -37.824972,
                lng: 144.958735,
                zoom: 10
            });
            $('#gmap_static').append('<span class="gmap-static" style="height:100%;display:block;background: url('+url+img_scale+') no-repeat 50% 50%;'+background_size+'"><img src="'+url+'" style="visibility:hidden" alt="" /></span>');

            // geocoding
            map_geocode = new GMaps({
                el: '#gmap_geocoding',
                lat: 55.478853,
                lng: 15.117188,
                zoom: 3
            });
            $('#geocoding_form').submit(function (e) {
                e.preventDefault();
                GMaps.geocode({
                    address: $('#gmaps_address').val().trim(),
                    callback: function (results, status) {
                        if (status == 'OK') {
                            var latlng = results[0].geometry.location;
                            map_geocode.setCenter(latlng.lat(), latlng.lng());
                            map_geocode.addMarker({
                                lat: latlng.lat(),
                                lng: latlng.lng()
                            });
                            map_geocode.map.setZoom(15);
                            $('#gmaps_address').val('');
                        }
                    }
                });
            });

        }
    ])
    .controller('footablesCtrl', [
        '$scope',
        function ($scope) {
            $('#footable_demo').footable({
                toggleSelector: " > tbody > tr > td > span.footable-toggle"
            }).on({
                'footable_filtering': function (e) {
                    var selected = $scope.userStatus;
                    if (selected && selected.length > 0) {
                        e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected : selected;
                        e.clear = !e.filter;
                    }
                }
            });

            $scope.clearFilters = function() {
                $('.filter-status').val('');
                $('#footable_demo').trigger('footable_clear_filter');
            }

            $scope.filterTable = function(userStatus) {
                $('#footable_demo').data('footable-filter').filter( $('#textFilter').val() );
            }

        }
    ])
    .controller('datatablesCtrl', [
        '$scope',
        '$timeout',
        function ($scope,$timeout) {

            var table = $('#datatable_demo').dataTable({
                "iDisplayLength": 25
            });

            $timeout(function() {
                oFH = new $.fn.dataTable.FixedHeader(table, {
                    "offsetTop": 48
                });
                oFH.fnUpdate();
            },2000);

            // please also add "updateFixedHeaders" directive (update fixedHeaders position on window resize) to parent element

        }
    ])
    .controller('vectorMapsCtrl', [
        '$scope',
        function ($scope) {

            // random colors
            var palette = ['#1f77b4', '#3a9add', '#888'];
            generateColors = function () {
                var colors = {},
                    key;
                for (key in map_ca.regions) {
                    colors[key] = palette[Math.floor(Math.random() * palette.length)];
                }
                return colors;
            };
            map_ca = new jvm.WorldMap({
                map: 'ca_mill_en',
                container: $('#vmap_canada'),
                backgroundColor: 'transparent',
                series: {
                    regions: [
                        {
                            attribute: 'fill'
                        }
                    ]
                }
            });
            map_ca.series.regions[0].setValues(generateColors());

            $scope.updateColors = function() {
                map_ca.series.regions[0].setValues(generateColors());
            };

            // markers on the map
            $('#vmap_markers').vectorMap({
                map: 'world_mill_en',
                backgroundColor: 'transparent',
                scaleColors: ['#c8eeff', '#0071a4'],
                normalizeFunction: 'polynomial',
                hoverColor: false,
                regionStyle: {
                    initial: {
                        fill: '#888'
                    },
                    hover: {
                        "fill-opacity": 1
                    }
                },
                markerStyle: {
                    initial: {
                        fill: '#fff',
                        stroke: '#1f77b4'
                    },
                    hover: {
                        fill: '#13476c',
                        stroke: '#13476c'
                    }
                },
                markers: [
                  {latLng: [41.90, 12.45], name: 'Vatican City'},
                  {latLng: [43.73, 7.41], name: 'Monaco'},
                  {latLng: [-0.52, 166.93], name: 'Nauru'},
                  {latLng: [-8.51, 179.21], name: 'Tuvalu'},
                  {latLng: [43.93, 12.46], name: 'San Marino'},
                  {latLng: [47.14, 9.52], name: 'Liechtenstein'},
                  {latLng: [7.11, 171.06], name: 'Marshall Islands'},
                  {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
                  {latLng: [3.2, 73.22], name: 'Maldives'},
                  {latLng: [35.88, 14.5], name: 'Malta'},
                  {latLng: [12.05, -61.75], name: 'Grenada'},
                  {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
                  {latLng: [13.16, -59.55], name: 'Barbados'},
                  {latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
                  {latLng: [-4.61, 55.45], name: 'Seychelles'},
                  {latLng: [7.35, 134.46], name: 'Palau'},
                  {latLng: [42.5, 1.51], name: 'Andorra'},
                  {latLng: [14.01, -60.98], name: 'Saint Lucia'},
                  {latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
                  {latLng: [1.3, 103.8], name: 'Singapore'},
                  {latLng: [1.46, 173.03], name: 'Kiribati'},
                  {latLng: [-21.13, -175.2], name: 'Tonga'},
                  {latLng: [15.3, -61.38], name: 'Dominica'},
                  {latLng: [-20.2, 57.5], name: 'Mauritius'},
                  {latLng: [26.02, 50.55], name: 'Bahrain'},
                  {latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
                ]
              });

        }
    ])
    .controller('topSearchCtrl', [
        '$scope',
        function ($scope) {
            $scope.selected = undefined;
            $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        }
    ])
;




