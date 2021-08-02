const Employee = require('../models/employee.model');

exports.getAllEmployees = async (req, res) => {
  try {
    Employee.find((err, docs) => {
      if (!err) {
        res.render('employee/list', {
          list: docs
        });
      } else {
        console.log('Error showing list', err);
      }
    }).lean();
  } catch (error) {
    console.log(error);
  }
};

exports.rederEmployeeCreatePage = async (req, res) => {
  res.render('employee/addOrEdit', {
    viewTitle : 'Insert Employee'
  });
};

exports.postEmployeeDetails = async (req, res) => {
  try {
    if(req.body && !req.body._id) {
      insertEmployee(req, res);
    } else {
      updateEmployee(req, res);
    }
  } catch(error) {
    console.log(error);
  }
}

exports.getEmployeeDetail = async (req, res) => {
  try {
    Employee.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.render('employee/addOrEdit', {
          viewTitle: 'Update Employee',
          employee: doc
        });
      } else {
        console.log('Error: ', err);
      }
    }).lean();
  } catch(error) {
    console.log(error);
  }
}

exports.deleteEmployee = async (req, res) => {
  Employee.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect('/employee/list');            
    } else {
      console.log('Error while deleting', err);
    }
  });
}

function insertEmployee(req, res) {
  const employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
    if (!err) {
      res.redirect('employee/list');
    } else {
      console.log('Error during record insertion : ', err);
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('employee/addOrEdit', {
          viewTitle : 'Insert Employee',
          employee : req.body
        });
      } else {
        console.log('Error while updating', err)
      }
    }
 });
}

function updateEmployee(req, res) {
  Employee.findOneAndUpdate({ _id : req.body._id }, req.body, {new : true}, (err, doc)=>{
    if (!err) {
      res.redirect('employee/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render('employee/addOrEdit', {
          viewTitle : 'Update Employee',
          employee : req.body
        });
      } else {
        console.log('Error while updating', err)
      }
    }
  })
}

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch(err.errors[field].path) {
      case 'fullName':
        body['fullNameError'] = err.errors[field].message;
        break;
      case 'email':
        body['emailError'] = err.errors[field].message;
        break;   
      default:
        break;    
    }
  }
}