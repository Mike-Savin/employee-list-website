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