function Routes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('users', {
      url: '/users',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('users.index', {
      url: '/index',
      templateUrl: 'views/users/index.html',
      controller: 'UsersIndexController'
    })
    .state('users.new', {
      url: '/new',
      templateUrl: 'views/users/new.html',
      controller: 'UsersNewController'
    });

  $urlRouterProvider.otherwise('/users/index');
}

Routes.$inject = ['$stateProvider', '$urlRouterProvider'];
angular.module('app').config(Routes);
