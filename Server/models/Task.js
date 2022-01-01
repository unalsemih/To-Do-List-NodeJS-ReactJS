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
    }
});

module.exports = mongoose.model('tasks', TaskSchema);

