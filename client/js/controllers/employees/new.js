var EmployeesNewController = function($scope, $state, validation, Employee) {
  $scope.employee = {};
  $scope.jobs = ['CEO', 'Business Analyst', 'Developer', 'QA'];
  $scope.submit = function() {
    Employee.create($scope.employee).$promise.then(function (res) {
      $state.go('employees.index');
    }, function (error) {
      validation.danger(error.data.error.details.messages);
    });
  };
};

EmployeesNewController.$inject = ['$scope', '$state', 'validation', 'Employee'];
angular.module('app').controller('EmployeesNewController', EmployeesNewController);