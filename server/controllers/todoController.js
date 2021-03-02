const {Todo} = require('../models');
const axios = require('axios');
const { request } = require('express');

class TodoController {
  static createTodo (req, res) {
    let body = req.body;

    let object = {
      title: body.title,
      description : body.description,
      status : body.status,
      due_date : body.due_date
    }

    let header = req.headers;
    object.UserId = header.decoded.id;
    let hasil = null;

    Todo.create(object)
      .then(data => {
        hasil = data;
        return axios({
          method : 'GET',
          url : 'https://stoicquotesapi.com/v1/api/quotes/random'
        })
      })
      .then(quotes => {
        let Quotes = {
          quote : quotes.data.body,
          author : quotes.data.author
        };
        res.status(201).json({hasil, Quotes});
      })
      .catch(err => {
        res.status(500).json({ message : 'Internal server error' });
      })
  }

  static getTodo (req, res) {
    Todo.findAll() 
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).json({ message : 'Internal server error'});
      })
  }

  static getTodoById (req, res) {
    let id = req.params.id;

    Todo.findByPk(id)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(404).send({message : 'Error not found'});
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
    let id = req.params.id;
    let body = req.body;

    let object = {
      status : body.status
    }

    Todo.findByPk(id)
      .then(data => {
        let createdAt = data.createdAt;
        let updatedAt = data.updatedAt;
        let title = data.title;
        let description = data.description;

        object.createdAt = createdAt;
        object.updatedAt = updatedAt;
        object.description = description;
        object.title = title;

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

  static deleteTodo (req, res) {
    let id = req.params.id;

    Todo.destroy({
      where: {
        id
      }
    })
      .then(data => {
        res.status(200).send({message : 'todo success to delete'});
      })
      .catch(err => {
        res.status(500).json({ message : 'internal server error'});
      })
  }
}

module.exports = TodoController;