const router = require('express').Router();
const todosRouter = require('./todosRouter');
const UserController = require('../controllers/userController');

router.use('/todos', todosRouter);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

module.exports = router;