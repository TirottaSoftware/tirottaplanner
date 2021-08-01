import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Todo from '../components/Todo';
import TodoInfo from '../components/TodoInfo';

function DeletedTasks() {
    
    const [todos, setTodos] = useState([]);
    const [todoSidebar, setTodoSidebar] = useState({todo: {}, hidden: true})

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        window.scrollTo(0, 0)
        updateUI()
    },[])

    const updateUI = () => {
        axios.get('https://tirottaplanner.herokuapp.com/todos/deleted').then(result => {
          setTodos(result.data);
        })
    }

    const deletePermanently = (id) => {
        axios.delete(`https://tirottaplanner.herokuapp.com/todos/${id}`).then(res => {
            console.log(res.data);
            setTodoSidebar({todo: {}, hidden: true})
            updateUI();
        })
    }

    const restoreTodo = (id) =>{
        axios.put('https://tirottaplanner.herokuapp.com/todos/restore', {id}).then(() => {
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
            <h1 id = 'todos-heading'>Deleted Tasks</h1>
            {
                todos&&todos.map(todo => {
                return <Todo toggleTaskInfo = {toggleTaskInfo} deletePermanently = {deletePermanently} restoreTask = {restoreTodo} key = {todo.id} todo = {todo} />
                })
            }
            <TodoInfo closeSidebar = {closeSidebar} todo = {todoSidebar.todo} hidden = {todoSidebar.hidden} />
        </div>
    )
}

export default DeletedTasks
