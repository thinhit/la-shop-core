/* States */
idsCore
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            var titlePrefix = 'idShop';
            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider
                .when('/home', '/')
                .otherwise('/');

            // State Configurations
            $stateProvider
                // Login Page
                .state("login", {
                    page_title: titlePrefix + ' - Login Page',
                    url: "/login",
                    templateUrl: 'views/login.html',
                    controller: 'loginCtrl'
                })
                // Errors
                .state("error", {
                    url: "/error",
                    abstract: true,
                    template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
                })
                // Errors > 404
                .state("error.404", {
                    page_title: titlePrefix + ' - Error 404',
                    url: "/404",
                    templateUrl: 'views/error.404.html'
                })
                // Authenticated
                .state("auth", {
                    abstract: true,
                    // this state url
                    url: "",
                    templateUrl: 'views/authenticated.html'
                })
                // Dashboard
                .state("auth.home", {
                    // this state page title
                    page_title: titlePrefix + ' - Dashboard',
                    // this state url
                    url: "/",
                    templateUrl: 'views/dashboard.html',
                    data: {
                        ncyBreadcrumbLabel: 'Trang quản lý'
                    },
                    // load state specific js/css
                    resolve: {
                        files: [
                            'uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    // c3 charts
                                    'assets/lib/d3/d3.min.js',
                                    'assets/lib/c3/c3.min.js',
                                    // vector maps
                                    'assets/lib/jvectormap/jquery-jvectormap-1.2.2.min.js',
                                    'assets/lib/jvectormap/maps/jquery-jvectormap-world-mill-en.js',
                                    // countUp animation
                                    'assets/js/countUp.min.js',
                                    // easePie chart
                                    'assets/lib/easy-pie-chart/dist/jquery.easypiechart.min.js',
                                    // dashboard functions
                                    'assets/angular/states_jquery/yukon_dashboard.min.js'
                                ]);
                            }
                        ]
                    },
                    controller: 'dashboardCtrl'
                })
                // Forms (parent state)
                .state('auth.product', {
                    // With abstract set to true, that means this state can not be explicitly activated.
                    abstract: true,
                    url: '/product',
                    template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
                })
                // Forms > Regular Elements
                .state('auth.product.list', {
                    page_title: titlePrefix + ' - Sản phẩm',
                    data: {
                        ncyBreadcrumbLabel: 'Danh sách sản phẩm'
                    },
                    // this url is appended to parent url (/forms/regular_elements)
                    url: '/list',
                    templateUrl: 'views/product.list.html',
                    resolve: {
                        files: [
                            'uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    // icheck
                                    'assets/lib/iCheck/skins/minimal/blue.css',
                                    'assets/lib/iCheck/icheck.min.js',
                                ]);
                            }
                        ]
                    },
                })

                // Forms (parent state)
                .state('auth.news', {
                    // With abstract set to true, that means this state can not be explicitly activated.
                    abstract: true,
                    url: '/news',
                    template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
                })

                .state('auth.news.group_news', {
                    page_title: titlePrefix + ' - Nhóm tin tức',
                    data: {
                        ncyBreadcrumbLabel: 'Nhóm tin tức'
                    },
                    // this url is appended to parent url (/forms/regular_elements)
                    url: '/group_news',
                    templateUrl: 'views/admin/group_news/list.html',
                    controller:'group_news'
                })


                .state('auth.news.list_news', {
                    page_title: titlePrefix + ' - Danh sách tin tức',
                    data: {
                        ncyBreadcrumbLabel: 'Danh sách tin tức'
                    },
                    url: '/list_news',
                    templateUrl: 'views/auth.news/list_news.html',
                    resolve: {
                        files: [
                            'uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'assets/lib/iCheck/icheck.min.js',
                                ]);
                            }
                        ]
                    },
                    controller: 'NewsListController'
                })

        }
    ]);