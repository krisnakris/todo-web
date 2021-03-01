 const {Todo} = require('../models');

class TodoController {
  static createTodo (req, res) {
    let body = req.body;

    let object = {
      title: body.title,
      description : body.description,
      status : body.status,
      due_date : body.due_date
    }

    Todo.create(object)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).json({ message : 'internal server error' });
      })
  }

  static getTodo (req, res) {
    Todo.findAll() 
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.send(500)
      })
  }

  static getTodoById (req, res) {
    let id = req.params.id;

    Todo.findByPk(id)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(404).send({message : 'error not found'});
      })
  }

  static putTodo (req, res) {
    let id = req.params.id;
    let body = req.body;

    let object = {
      title : body.title,
      description : body.description,
      status : body.status,
      due_date : body.due_date,
    }

    Todo.findByPk(id)
      .then(data => {
        let createdAt = data.createdAt;
        let updatedAt = data.updatedAt;

        object.createdAt = createdAt;
        object.updatedAt = updatedAt;

        return Todo.update(object, {
          where : {
            id
          }
        })
      })
      .then(data2 => {
        res.status(200).send(object);
      })
      .catch(err => {
        res.send(err);
      })
  }

  static patchTodo (req, res) {

  }
}

module.exports = TodoController;