const {Schema, model} = require('mongoose')

const todoSchema = new Schema({
    title: {type: String, required: true}, 
    completed: Boolean,
})

const Todo = model('Todo', todoSchema)

module.exports = Todo