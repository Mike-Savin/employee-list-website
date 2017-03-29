var app = angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'lbServices',
  'ngToast',
  'ui.bootstrap.datetimepicker',
  'cgPrompt'
]);


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

var validation = function (ngToast) {
  var publicMethods = {
    message: function (type, messages) {
      if (!messages) {
        return;
      }

      if (messages.constructor === Array) {
        return messages.forEach(function (message) {
          publicMethods.message(type, message);
        });
      }

      if (typeof messages === 'object') {
        if (messages && messages.data && messages.data.error) {
          return publicMethods.message(type, messages.data.error);
        } else {
          // If 'messages' is an object of validation messages - convert it to array
          return publicMethods.message(type, Object.keys(messages).map(function (key) {
            return messages[key]
          }));
        }
      }

      ngToast[type]({
        content: messages
      });
    },

    success: function (messages) {
      publicMethods.message('success', messages);
    },

    danger: function (messages) {
      publicMethods.message('danger', messages);
    }
  };

  return publicMethods;
};

validation.$inject = ['ngToast'];
angular.module('app').factory('validation', validation);
var UsersIndexController = function($scope, prompt, Employee) {
  $scope.employees = [];
  $scope.delete = function (employee) {
    prompt({
      title: 'Delete',
      message: 'Are you sure you want delete ' +
        employee.firstName + ' ' + employee.lastName + '?'
    }).then(function () {
      return Employee.deleteById({id: employee.id});
    }, function () {
      return false;
    }).then(function (result) {
      if (result) {
        var index = $scope.employees.indexOf(employee);
        $scope.employees.splice(index, 1);
      }
    });
  };

  Employee.find().$promise.then(function (employees) {
    $scope.employees = employees;
  });
};

UsersIndexController.$inject = ['$scope', 'prompt', 'Employee'];
angular.module('app').controller('UsersIndexController', UsersIndexController);
var UsersNewController = function($scope, $state, validation, Employee) {
  $scope.employee = {};
  $scope.jobs = ['CEO', 'Business Analyst', 'Developer', 'QA'];
  $scope.submit = function() {
    Employee.create($scope.employee).$promise.then(function (res) {
      $state.go('users.index');
    }, function (error) {
      validation.danger(error.data.error.details.messages);
    });
  };
};

UsersNewController.$inject = ['$scope', '$state', 'validation', 'Employee'];
angular.module('app').controller('UsersNewController', UsersNewController);