const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Number
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('tasks', TaskSchema);

