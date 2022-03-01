const express = require('express');
const { check } = require('express-validator');

const studentController = require('../controllers/student-controller');

const router = express.Router();

router.post('/signup', [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
], studentController.signup);

router.post('/', [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
], studentController.login);

router.get('/timetable/:classid', studentController.getTimeTable);

router.get('/:dept/:name', studentController.getProfTimeTable);


module.exports = router;