const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    name: { type: String, required: true },
    dept: { type: String, required: true },
    DOB: { type: String, required: true },
    phone: { type: Number, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    timetable: { 
        monday: [{type: String, required: false}],
        tuesday: [{type: String, required: false}],
        wednesday: [{type: String, required: false}],
        thursday: [{type: String, required: false}],
        friday: [{type: String, required: false}],
        saturday: [{type: String, required: false}]
    }
});

staffSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Staff', staffSchema);