const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    todo: {
        type: String,
        required: true,
    }
});

const Todo = mongoose.model('todos', todoSchema);
module.exports = Todo;