import React, {useState} from 'react'

const AddTodoForm = (props) => {
    const [nameInput, setNameInput] = useState('');
    const [contentInput, setContentInput] = useState('');
    const [timeInput, setTime] = useState('12:00');

    const [formErrorMessage, setFormErrorMessage] = useState('');

    const handleTitleInputChange = (e) => {
        e.preventDefault();

        setNameInput(e.target.value);
    }
    const handleContentInputChange = (e) => {
        e.preventDefault();

        setContentInput(e.target.value);
    }
    const handleTimeInputChange = (e) => {
        e.preventDefault();

        setTime(e.target.value);
        console.log(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if(nameInput.length === 0){
            setFormErrorMessage('Name cannot be empty.');
            return;
        }
        props.addTodo(nameInput, contentInput, timeInput, false, false);

        setNameInput('');
        setContentInput('');
        setTime('12:00');
        setFormErrorMessage('');
        props.hideForm();
    }

    const closeForm = () => {
        setFormErrorMessage('');
        props.hideForm();
    }

    return <div className = {props.open?'add-todo-form':'form-hidden'}>
        <h1>New Todo</h1>
        <form onSubmit = {handleFormSubmit}>
            <p className = 'form-error-msg'>{formErrorMessage}</p>
            <input onChange = {handleTitleInputChange} name = 'title' value = {nameInput} placeholder = 'name' />

            <textarea rows = '5' onChange = {handleContentInputChange} name = 'description' value = {contentInput} placeholder = 'description'></textarea>
            
            <div className = 'form-lower-container'>
                <div className = 'form-time'>
                    <label htmlFor = 'time'>time</label>
                    <input type = 'time' name = 'time' value = {timeInput} onChange = {handleTimeInputChange} />
                </div>
                <div className = 'form-buttons'>
                    <input className = 'btn-form btn-form-close' readOnly onClick = {closeForm} value = 'Close' />
                    <input className = 'btn-form' type = 'submit' value = 'Add' />
                </div>
            </div>
        </form>
    </div>
}

export default AddTodoForm;