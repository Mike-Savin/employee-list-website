module.exports = function(app) {
  app.dataSources.mongo.automigrate('Employee', function (err) {
    if (err) throw err;

    app.models.Employee.create([{
      firstName: 'Michael',
      lastName: 'Savin',
      jobTitle: 'Developer',
      employmentDate: '10.10.2016',
      rate: 10
    }], function (err, employees) {
      if (err) throw err;

      console.log('Models created: \n', employees);
    });
  });
};