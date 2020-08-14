// to require the library
const mongoose = require('mongoose');

// to create the Schema for tasks to be used in robo 3t
const timeSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    category: {
        type: String,
        required: true
    }
});
const Time = mongoose.model('times', timeSchema);

// to export the Schema
module.exports = Time;