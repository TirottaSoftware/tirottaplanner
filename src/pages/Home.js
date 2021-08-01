import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Todo from '../components/Todo';
import AddTodoForm from '../components/AddTodoForm';
import TodoInfo from '../components/TodoInfo';
import { AuthContext } from '../AuthContext';

function Home() {
    const [todos, setTodos] = useState([]);
    const [formVisibility, setFormVisibility] = useState(false);
    const [todoSidebar, setTodoSidebar] = useState({todo: {}, hidden: true})

    const {authState} = useContext(AuthContext)

    useEffect(() => {
      window.scrollTo(0, 0)
      document.body.style.overflowY = 'hidden';
      updateUI();
    }, [])
  
    const updateTodo = (id, time, description) => {
      axios.put('https://tirottaplanner.herokuapp.com/todos/', {id, time, description}).then(res => {
        console.log(res.data)
        updateUI();
      })
    }

    const addTodo = (name, description, time, isCompleted, isDeleted) => {
      console.log(authState.loggedUser.uid)
      axios.post('https://tirottaplanner.herokuapp.com/todos', {name, description, time, isCompleted, isDeleted, UserId: authState.loggedUser.uid}).then(() => {
        updateUI();
      })
    }
  
    const completeTask = (id) => {
      axios.put('https://tirottaplanner.herokuapp.com/todos/complete', {id}).then((res) => {
        setTodoSidebar({...todoSidebar, todo: res.data})
        updateUI();
      })
    }
  
    const updateUI = () => {
      axios.get(`https://tirottaplanner.herokuapp.com/todos/getall/${authState.loggedUser.uid}`).then(result => {
        setTodos(result.data);
      })
    }

    const toggleForm = () => {
      setFormVisibility(!formVisibility);
    }

    const deleteTask = (id) => {
      axios.put('https://tirottaplanner.herokuapp.com/todos/delete', {id}).then(res => {
        closeSidebar();
        updateUI();
      })
    }

    const closeSidebar = () => {
      setTodoSidebar({...todoSidebar, hidden:true})
    }

    const toggleTaskInfo = (todo) => {
      if(todo.id === todoSidebar.todo.id){
        setTodoSidebar({todo, hidden: !todoSidebar.hidden})
      }
      else{
        setTodoSidebar({todo, hidden: false})
      }
    }

    return (
        <div className = 'todos-section'>
            <div>
              <h1 id = 'todos-heading'>My Todos</h1>
                {
                  todos&&todos.map(todo => {
                    return <Todo toggleTaskInfo = {toggleTaskInfo} deleteTask = {deleteTask} completeTask = {completeTask} key = {todo.id} todo = {todo} />
                  })
                }
                <div id = 'new-task-div'>
                  <button className = 'btn-new-task' onClick = {toggleForm}>{formVisibility?'Close':'+New Todo'}</button>
                </div>
              <AddTodoForm open = {formVisibility} hideForm = {toggleForm} addTodo = {addTodo} />
              <TodoInfo updateTodo = {updateTodo} closeSidebar = {closeSidebar} todo = {todoSidebar.todo} hidden = {todoSidebar.hidden} />
            </div>
        </div>
    )
}

export default Home
