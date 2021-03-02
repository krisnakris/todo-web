const router = require('express').Router();
const todosRouter = require('./todosRouter');
const UserController = require('../controllers/userController');
const authenticate = require('../middlewares/authentication');

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.use(authenticate);

router.use('/todos', todosRouter);


module.exports = router;