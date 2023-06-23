const Todo = require('../models/data');

exports.addTodo = async (req, res) => {
    try {
        const { todo } = req.body;
        const userId = req.user.userId;
        console.log("todosCont==>useId", userId);
        const newData = new Todo({ userId, todo });
        await newData.save();
        res.status(201).json({ message: 'Data added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};