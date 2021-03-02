const router = require('express').Router();
const TodoController = require('../controllers/todoController');
const authorize = require('../middleware/authorize');

router.post('/', TodoController.createTodo);
router.get('/', TodoController.getTodo);

router.use('/:id', authorize);

router.get('/:id', TodoController.getTodoById);
router.put('/:id', TodoController.putTodo);
router.patch('/:id', TodoController.patchTodo);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;