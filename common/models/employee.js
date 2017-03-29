'use strict';

module.exports = function(Employee) {
  Employee.validatesNumericalityOf('rate', {message: { number: 'Rate should be a number' }});
  Employee.validatesPresenceOf('firstName', {message: 'First name is required'});
  Employee.validatesPresenceOf('lastName', {message: 'Last name is required'});
  Employee.validatesPresenceOf('rate', {message: 'Rate is required'});
  Employee.validatesPresenceOf('jobTitle', {message: 'Job title is required'});
  Employee.validatesPresenceOf('employmentDate', {message: 'Employment date is required'});
  Employee.validatesInclusionOf('jobTitle', {
  	in: ['CEO', 'Business Analyst', 'Developer', 'QA'],
  	message: "Job title must be one of: 'CEO', 'Business Analyst', 'Developer', 'QA'"
  });
};
