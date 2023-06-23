const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const todosController = require('../controllers/todosController');

const router = express.Router();

router.post('/addTodo', authMiddleware.authenticateUser, todosController.addTodo);

module.exports = router;