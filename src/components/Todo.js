import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faHistory } from '@fortawesome/free-solid-svg-icons';

const Todo = (props) => {

    const completeTask = () => {
        const id = props.todo.id;
        props.completeTask(id);
    }

    const restoreTask = () => {
        const id = props.todo.id;
        props.restoreTask(id);
    }

    const deleteTask = () => {
        const id = props.todo.id;
        props.deleteTask(id);
    }

    const deletePermanently = () => {
        const id = props.todo.id;
        props.deletePermanently(id);
    }

    const showInfo = () => {
        const todo = props.todo;
        props.toggleTaskInfo(todo);
    }

    return (
        <div className = {props.todo.isCompleted?'todo completed':'todo'} >
            <p>{props.todo.todoName}</p>
            <div className = 'todo-buttons'>
                <button onClick = {props.todo.isDeleted?restoreTask:completeTask}><FontAwesomeIcon icon = {props.todo.isDeleted?faHistory:faCheck} /></button>
                <button onClick = {showInfo}><FontAwesomeIcon icon = {faInfo} /></button>
                <button onClick = {props.todo.isDeleted?deletePermanently:deleteTask} id = 'btn-nb'><FontAwesomeIcon icon = {faTrashAlt} /></button>
            </div>
        </div>  
    )
}

export default Todo;
