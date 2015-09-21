var app = angular.module('app', ['ui.router', 'swipe', 'snapscroll', 'oc.lazyLoad', 'facebook']);
app
.config(['$stateProvider', '$ocLazyLoadProvider', 'FacebookProvider', '$urlRouterProvider', function($stateProvider, $ocLazyLoadProvider, FacebookProvider, $urlRouterProvider) {

  $urlRouterProvider.when('', '/');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'index/index.html',
      resolve: {
        loadMyPlugins: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load files for an existing module
               return $ocLazyLoad.load([
                  {
                    files: ['index/indexDirective.js']
                  },
                  {
                    name: 'ngDialog',
                    files: ['bower_components/ngDialog/js/ngDialog.js'
                            ,'bower_components/ngDialog/css/ngDialog.css'
                            ,'bower_components/ngDialog/css/ngDialog-theme-default.css'
                            ,'bower_components/ngDialog/css/ngDialog-theme-plain.css'
                          ]
                  }
               ]);
          }
        ]
      },
      controller: 'IndexCtrl'
    })
    .state('main', {
      url: '',
      templateUrl: 'resources/templates/main.tpl.html'
    })
    .state('main.home', {
      url: '/home',
      templateUrl: 'home/home.html',
      controller: 'HomeCtrl'
    })
    .state('main.profile', {
      url: '/profile',
      templateUrl: 'profile/profile.html',
      controller: 'profileCtrl'
    });

    FacebookProvider.init('873001566117790');
}]);
