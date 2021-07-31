import React, {useState} from 'react'

const TodoInfo = (props) => {
    const [descriptionInput, setDescriptionInput] = useState(props.todo.description);
    const [descriptionChangeHandler, setDescriptionChangeHandler] = useState(0);
    const [timeChangeHandler, setTimeChangeHandler] = useState(0);
    const [changeTime, setChangeTime] = useState(false);
    const [todoTime, setTodoTime] = useState(props.todo.time);
    const [actionMessage, setActionMessage] = useState('');

    const handleDescriptionChange = (e) => {
        if(props.todo.isDeleted){
            return;
        }
        e.preventDefault();
        
        setDescriptionChangeHandler(props.todo.id);
        setDescriptionInput(e.target.value)
    }

    const handleEditButtonClick = () => {
        setChangeTime(!changeTime);
    }

    const handleTimeChange = (e) => {
        e.preventDefault();

        setTimeChangeHandler(props.todo.id);
        setTodoTime(e.target.value);
    }

    const updateTodo = () => {
        props.updateTodo(props.todo.id, todoTime, descriptionInput);
        setActionMessage('Updated!')
    }

    const closeSidebar = () =>{
        setActionMessage('');
        props.closeSidebar();
    }

    return (
        <div className = {props.hidden?'hidden todo-sidebar':'todo-sidebar'}>
            <h1>{props.todo.todoName}</h1>
            <p>Created At: {props.todo.createdAt}</p>
            <div className = 'tp-description'>
                <label>description</label>
                <textarea rows = '5' onChange = {handleDescriptionChange} value = {descriptionChangeHandler===props.todo.id?descriptionInput:props.todo.description}/>
            </div>

            <div className = 'tp-time'>
                <p>Time: {changeTime?<input onChange = {handleTimeChange} type = 'time' />:timeChangeHandler===props.todo.id?todoTime:props.todo.time}</p>
                {props.todo.isDeleted?null:<button onClick = {handleEditButtonClick}>{changeTime?'Done':'Edit'}</button>}
            </div>
            <div className = 'tp-status'>
                <p>Completed: {props.todo.isCompleted?'Yes':'No'}</p>
                <p>Deleted: {props.todo.isDeleted?'Yes':'No'}</p>
            </div>
            <div className = 'tp-buttons'>
                <button onClick = {closeSidebar}>Close</button>
                {props.todo.isDeleted?null:<button onClick = {updateTodo}>Save</button>}
            </div>
            <p>{actionMessage}</p>
        </div>
    )
}

export default TodoInfo
