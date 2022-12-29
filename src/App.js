// import './App.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { Routes, Route } from 'react-router-dom'
// import { diffIndexes } from '../models/todo';

function App() {
    const [todos, setTodos] = useState([])
    const [foundTodo, setFoundTodo] = useState(null)
    const [newTodo, setNewTodo] = useState({
        title: '',
        completed: false
    })
    // index
    const getTodos = async () => {
        try {
            const response = await fetch('/api/todos')
            const data = await response.json()
            setTodos(data)
        } catch (error) {
            console.error(error)
        }
    }
    //delete
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setFoundTodo(data)
        } catch (error) {
            console.error(error)
        }
    }
    // // update
    const updateTodo = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...updatedData})
            })
            const data = await response.json()
            setFoundTodo(data)
        } catch (error) {
            console.error(error)
        }
    }
    // // create
    const createTodo = async () => {
        try {
            const response = await fetch(`/api/todos`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...newTodo })
            })
            const data = await response.json()
            setFoundTodo(data)
            setNewTodo({
                title: '',
                completed: false
            })
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getTodos()
    }, [foundTodo])


    const handleChange = (e) => {
        setNewTodo({ ...newTodo, [e.target.name]: e.target.value })
    }
    return (
        <>
          
            <div className='container'>
                <div className='card'>
                <h1>To Do List</h1>
                <form onSubmit={createTodo}>
                    <input type="text" placeholder="Add your task here!" onChange={handleChange} value={newTodo.title} name="title" />
                </form>
     <br />
 

      
     <h2>In Progress</h2>
      
      {todos && todos.filter((index) => !index.completed).length
        ? (
            todos
            .filter((index) => !index.completed)
            .map((todo, index) => {
              return (
                <li key={index}>
                   
                   <button onClick={() => {updateTodo(todo._id, {title: todo.title, completed: true})}}> <i className="fa fa-check"></i>
</button>&nbsp;&nbsp;
                  {todo.title}<br />
                </li>  
              )
            })
          )
        : 'no todos added'}
        <br />
        
        <h2>Done</h2>


            {/* {todos && todos.length ?
                (todos.map((todo, index) => {
                    return (
                        <li key={index}>{todo.title} <button onClick={()=>{updateTodo}}>complete to do</button></li>)
                }))
                : ("nothing here")} */}
        
        
        {todos && todos.filter((index)=>index.completed).length?
        (
            todos.filter((index)=>index.completed)
            .map((todo, index)=>{
                return (<li key={index}><button onClick={()=>{deleteTodo(todo._id)}}><i className="fa fa-times"></i></button>&nbsp;&nbsp;
                {todo.title} </li>
                )
            })
            ):'nah bitch'}
                </div>
      
            </div>   
    
              
        </>
    )
}

export default App;