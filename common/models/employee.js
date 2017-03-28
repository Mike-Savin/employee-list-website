'use strict';

module.exports = function(Employee) {
  Employee.validatesInclusionOf('jobTitle', {in: ['CEO', 'Business Analyst', 'Developer', 'QA']});
};
