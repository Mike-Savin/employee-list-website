var EmployeesIndexController = function($scope, prompt, Employee) {
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

EmployeesIndexController.$inject = ['$scope', 'prompt', 'Employee'];
angular.module('app').controller('EmployeesIndexController', EmployeesIndexController);