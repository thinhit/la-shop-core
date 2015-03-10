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
                .state('auth.forms', {
                    // With abstract set to true, that means this state can not be explicitly activated.
                    abstract: true,
                    url: '/forms',
                    template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
                })
                // Forms > Regular Elements
                .state('auth.forms.regular_elements', {
                    page_title: titlePrefix + ' - Sản phẩm',
                    data: {
                        ncyBreadcrumbLabel: 'Danh sách sản phẩm'
                    },
                    // this url is appended to parent url (/forms/regular_elements)
                    url: '/regular_elements',
                    templateUrl: 'views/forms.regular_elements.html'
                })       
        }
    ]);