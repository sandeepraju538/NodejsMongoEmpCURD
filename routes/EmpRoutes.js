const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

router.route('/').post(employeeController.postEmployeeDetails);
router.route('/').get(employeeController.rederEmployeeCreatePage);
router.route('/list').get(employeeController.getAllEmployees);
router.route('/:id').get(employeeController.getEmployeeDetail);
router.route('/delete/:id').get(employeeController.deleteEmployee);

module.exports = router;
