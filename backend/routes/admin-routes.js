const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');

const adminController = require('../controllers/staff-controller');

const router = express.Router();

router.post('/signup', [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
], adminController.signup);

router.post('/', [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
], adminController.login);

router.use(checkAuth);

router.get('/studentdetails/:name/:rollno', adminController.getStudent);
router.get('/staffdetails/:dept/:name', adminController.getStaff);

router.patch('/prof/timetable', adminController.updateTimeTable);
router.patch('/timetable', adminController.updateClassTimeTable);

router.delete('/studentdetails/:name/:rollno', adminController.deleteStudent);
router.delete('/staffdetails/:dept/:name', adminController.deleteStaff);

module.exports = router;