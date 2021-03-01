const router = require('express').Router();
const todosRouter = require('./todosRouter');

router.use('/todos', todosRouter);

module.exports = router;