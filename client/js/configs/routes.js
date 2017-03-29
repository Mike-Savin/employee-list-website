function Routes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('employees', {
      url: '/employees',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('employees.index', {
      url: '/index',
      templateUrl: 'views/employees/index.html',
      controller: 'EmployeesIndexController'
    })
    .state('employees.new', {
      url: '/new',
      templateUrl: 'views/employees/new.html',
      controller: 'EmployeesNewController'
    });

  $urlRouterProvider.otherwise('/employees/index');
}

Routes.$inject = ['$stateProvider', '$urlRouterProvider'];
angular.module('app').config(Routes);
