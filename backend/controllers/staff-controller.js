const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Class = require('../models/class');
const Student = require('../models/staff');
const Staff = require('../models/student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return next(
            new HttpError('Invalid Inputs Passed, check your data', 422)
        );
    }

    const { name, dept, dob, phno, email, password, timetable } = req.body;
    
    let existingStaff;
    try {
        existingStaff = await Staff.findOne({ email: email });
    } catch (err) {
        return next(
            new HttpError('Signing up failed, please try again', 500)
        );
    }

    if(existingStaff) {
        return next(
            new HttpError('User already Exists, login instead', 422)
        );
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return next(
            new HttpError('Could not create User, please try again', 500)
        );
    }

    const createdStaff = new Staff({
        name,
        dept,
        DOB: dob,
        phno,        
        email,
        password: hashedPassword,
        timetable
    });

    try {
        await createdStaff.save();
    } catch (err) {
        return next(
            new HttpError('Signing up failed, please try again', 500)
        );
    }

    let token;
    try {
        token = jwt.sign(
            { email: createdStaff.email },
            'secret_token',
            { expiresIn: '4h' }
        );
    } catch (err) {
        return next(
            new HttpError('Signing up failed, please try again', 500)
        );
    }

    res.status(201).json({ name: createdStaff.name, token: token, email: createdStaff.email, timetable: createdStaff.timetable });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingStaff;
    try {
        existingStaff = await Staff.findOne({ email: email });
    } catch (err) {
        return next(
            new HttpError('Login failed, please try again', 500)
        );
    }

    if(!existingStaff) {
        return next(
            new HttpError('Invalid Email or Password', 403)
        );
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingStaff.password);
    } catch (err) {
        return next(
            new HttpError('Could not login, please try again', 500)
        );
    }

    if(!isValidPassword) {
        return next(
            new HttpError('Invalid Email or Password', 403)
        );
    }

    let token;
    try {
        token = jwt.sign(
            { email: existingStaff.email },
            'secret_token',
            {expiresIn: '4h'}
        );
    } catch (err) {
        return next(
            new HttpError('Login failed, please try again', 500)
        );
    }

    res.status(201).json({ email: existingStaff.email, token: token, timetable: existingStaff.timetable });
};

const getStudent = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return next(
            new HttpError('Invalid Inputs Passed, check your data', 422)
        );
    }

    const name = req.params.name;
    const rollno = req.params.rollno;

    let existingStudents;
    try {
        existingStudents = await Student.find({ name: name }, '-password');
    } catch (err) {
        return next(
            new HttpError('Unexpected error occured, please try again', 404)
        );
    }

    if(!existingStudents) {
        return next(
            new HttpError('Could not find any student', 403)
        );
    }

    let requiredStudent = existingStudents.map(s => {
        if(s.rollno === rollno) {
            return s;
        }
    });

    if(!requiredStudent) {
        return next(
            new HttpError('Could not find any student', 403)
        );
    }

    res.status(201).json({ name: requiredStudent.name, rollno: requiredStudent.rollno, _class: requiredStudent._class, dob: requiredStudent.DOB, email: requiredStudent.email });
};

const getStaff = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return next(
            new HttpError('Invalid Inputs Passed, check your data', 422)
        );
    }

    const dept = req.params.dept;
    const name = req.params.name;

    let existingStaffs;
    try {
        existingStaffs = await Staff.find({ name: name }, '-password');
    } catch (err) {
        return next(
            new HttpError('Unexpected error occured, please try again', 404)
        );
    }

    if(!existingStaffs) {
        return next(
            new HttpError('Could not find any student', 403)
        );
    }

    let requiredStaff = existingStaffs.map(s => {
        if(s.dept === dept) {
            return s;
        }
    });

    if(!requiredStaff) {
        return next(
            new HttpError('Could not find any student', 403)
        );
    }

    res.status(201).json({ name: requiredStaff.name, dept: requiredStaff.dept, phno: requiredStaff.phno, dob: requiredStaff.DOB, email: requiredStaff.email });
};

//Updating Professors time table
const updateTimeTable = async (req, res, next) => {
    const timetable = req.body;
    const dept = req.params.dept;
    const prof = erq.params.prof;

    let existingProf;
    try {
        existingProf = await Staff.find({ dept: dept, name: prof });
    } catch (err) {
        return next(
            new HttpError('Could not process you request, please try again', 404)
        );
    }

    if(!existingProf) {
        return next(
            new HttpError('Could not find', 403)
        );
    }

    existingProf.timetable = timetable;

    try {
        await existingProf.save();
    } catch (err) {
        return next(
            new HttpError('Could not process your request, please try again', 404)
        );
    }

    res.status(201).json({ prof: existingProf.toObject({ getters: true }) });
};

const updateClassTimeTable = async (req, res, next) => {
    const _class = req.params.classid;
    const timetable = req.body;

    let existingClass;
    try {
        existingClass = await Class.findOne({ _class: _class });
    } catch (err) {
        return next(
            new HttpError('Could not process your request, please try again', 404)
        );
    }

    if(!existingClass) {
        return next(
            new HttpError('Could not find the class', 403)
        );
    }

    existingClass.timetable = timetable;

    try {
        await existingClass.save();
    } catch (err) {
        return next(
            new HttpError('Could not process your request, please try again', 404)
        );
    }

    res.status(201).json({ existingClass: existingClass.toObject({ getters: true }) });
};

const deleteStaff = async (req, res, next) => {
    const dept = req.params.dept;
    const name = req.params.name;

    let staff;
    try {
        staff = await Staff.findOne({ name: prof, dept: dept });
    } catch (err) {
        return next(
            new HttpError('Could not process your request, please try again', 500)
        );
    }

    if(!staff) {
        return next(
            new HttpError('Does not exist in database', 404)
        );
    }

    if(window.location.pathname.split('/').findIndex(x => x === 'admin') < 0) {
        return next(
            new HttpError('You are not authorised', 401)
        );
    }

    try {
        await Staff.findOneAndDelete({ name: prof, dept: dept });
    } catch (err) {
        return next(
            new HttpError('Could not delete the user', 404)
        );
    }

    res.status(201).json({ name: staff.name, dept: staff.dept });
};

const deleteStudent = async (req, res, next) => {
    const rollno = req.params.rollno;

    let student;
    try {
        student = await Student.findOne({ rollno: rollno });
    } catch (err) {
        return next(
            new HttpError('Could not process your request, please try again', 500)
        );
    }

    if(!student) {
        return next(
            new HttpError('Does not exist in database', 404)
        );
    }

    if(window.location.pathname.split('/').findIndex(x => x === 'admin') < 0) {
        return next(
            new HttpError('You are not authorised', 401)
        );
    }

    try {
        await Student.findOneAndDelete({ rollno: rollno });
    } catch (err) {
        return next(
            new HttpError('Could not delete the user', 404)
        );
    }

    res.status(201).json({ name: student.name, _class: student._class, email: student.email, rollno: student.rollno });
};

exports.deleteStaff = deleteStaff;
exports.deleteStudent = deleteStudent;
exports.updateClassTimeTable = updateClassTimeTable;
exports.updateTimeTable = updateTimeTable;
exports.getStaff = getStaff;
exports.getStudent = getStudent;
exports.signup = signup;
exports.login = login;