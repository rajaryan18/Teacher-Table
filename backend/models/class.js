const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const classSchema = new Schema({
    _class: { type: String, required: true, unique: true },
    timetable: { 
        monday: [{type: String, required: false}],
        tuesday: [{type: String, required: false}],
        wednesday: [{type: String, required: false}],
        thursday: [{type: String, required: false}],
        friday: [{type: String, required: false}],
        saturday: [{type: String, required: false}]
    }
});

classSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Class', classSchema);