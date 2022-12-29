const Todo = require('../../models/todo')

const dataController = {
  // Index,
  index (req, res, next) {
    Todo.find({}, (err, foundTodos) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todos = foundTodos
        next()
      }
    })
  },
  // Destroy
  destroy (req, res, next) {
    Todo.findByIdAndDelete(req.params.id, (err, deletedTodo) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todo = deletedTodo
        next()
      }
    })
  },
  // Update
  update (req, res, next) {

    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTodo) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todo = updatedTodo
        next()
      }
    })
  },
  // Create
  create (req, res, next) {
   
    Todo.create(req.body, (err, createdTodo) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.todo = createdTodo
        next()
      }
    })
  },
  // Edit
  // Show
  show (req, res, next) {
    Todo.findById(req.params.id, (err, foundTodo) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: 'Could not find a todo with that ID'
        })
      } else {
        res.locals.data.todo = foundTodo
        next()
      }
    })
  }
}

const apiController = {
    index (req, res, next) {
      res.json(res.locals.data.todos)
    },
    show (req, res, next) {
      res.json(res.locals.data.todo)
    }
  }

module.exports = { dataController, apiController }