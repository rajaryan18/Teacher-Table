const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Student = require('../models/student');
const Class = require('../models/class');
const Staff = require('../models/staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return next(
            new HttpError('Invalid Inputs Passed, check your data', 422)
        );
    }

    const { name, rollno, DOB, _class, email, password } = req.body;
    
    let existingStudent;
    try {
        existingStudent = await Student.findOne({ email: email });
    } catch (err) {
        return next(
            new HttpError('Signing up failed, please try again', 500)
        );
    }

    if(existingStudent) {
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

    const createdStudent = new Student({
        name,
        rollno,
        DOB,
        _class,
        email,
        password: hashedPassword
    });

    try {
        await createdStudent.save((err, result) => {
            if(err) console.log(err);
            else console.log(result);
        });
    } catch (err) {
        return next(
            new HttpError('Signing up failed, please try again', 500)
        );
    }

    let token;
    try {
        token = jwt.sign(
            { email: createdStudent.email },
            'secret_token',
            { expiresIn: '4h' }
        );
    } catch (err) {
        return next(
            new HttpError('Signing up failed, please try again', 500)
        );
    }

    res.status(201).json({ email: createdStudent.email, name: createdStudent.name, token: token, _class: createdStudent._class });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingStudent;
    try {
        existingStudent = await Student.findOne({ email: email });
    } catch (err) {
        return next(
            new HttpError('Login failed, please try again', 500)
        );
    }

    if(!existingStudent) {
        return next(
            new HttpError('Invalid Email or Password', 403)
        );
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingStudent.password);
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
            { email: existingStudent.email },
            'secret_token',
            {expiresIn: '4h'}
        );
    } catch (err) {
        return next(
            new HttpError('Login failed, please try again', 500)
        );
    }

    console.log(existingStudent);

    res.status(201).json({ email: existingStudent.email, _class: existingStudent._class, token: token });
};

const getProfTimeTable = async (req, res, next) => {
    const dept = req.params.dept;
    const name = req.params.name;
    let allProfs;
    try {
        allProfs = await Staff.find({}, '-password');
    } catch (err) {
        return next(
            new HttpError('Searching failed, please try again', 500)
        );
    }

    const profs = allProfs.map(prof => {
        if(prof.name === name && prof.dept === dept) {
            return prof;
        }
    });

    res.status(201).json({ timetable: profs.timetable, email: profs.email });
};

const getTimeTable = async (req, res, next) => {
    console.log("Timetable");
    const _class = req.params.classid;

    let classes;
    try {
        classes = await Class.findOne({ _class: _class });
    } catch (err) {
        return next(
            new HttpError('Could not fetch, please try again', 500)
        );
    }

    if(!classes) {
        return next(
            new HttpError('No such class found, please try again', 404)
        );
    }

    res.status(201).json({ timetable: classes.timetable });
}

exports.getTimeTable = getTimeTable;
exports.login = login;
exports.signup = signup;
exports.getProfTimeTable = getProfTimeTable;