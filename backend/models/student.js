const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type: String, required: true },
    rollno: { type: String, required: true },
    DOB: { type: String, required: true },
    _class: { type: String, required: true, ref: 'Class' },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

studentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Students', studentSchema);