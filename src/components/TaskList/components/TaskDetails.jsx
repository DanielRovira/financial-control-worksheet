import React, { useState } from 'react';
// import { useEffect } from 'react';
import { TextareaAutosize } from '@mui/base';
import Button from '@mui/material/Button';

import './css/TaskDetails.css'

const TaskDetails = ({ task, handleDescAddition, setTasksDetail }) => {
    const [description, setDescription] = useState(task.description || '');

    const handleBackButtonClick = () => {
        description !== task.description && handleDescAddition(description, task._id)
        setTasksDetail()
    };

    const handleInputChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <>
            <div className='upper-container'>
                <div>
                    <h2>{task.title}</h2>
                </div>
                <div className='back-button-container'>
                    <Button variant='contained' className='back-button' onClick={handleBackButtonClick} style={{ textTransform: 'none' }}>Back</Button>
                </div>
            </div>
            <div>
                <TextareaAutosize
                    autoFocus 
                    type="text"
                    placeholder="Details.."
                    className='task-input-detail'
                    minRows={5}
                    id='task-input-detail'
                    onChange={handleInputChange}
                    defaultValue={task.description}
                    onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                />
            </div>
        </>
    );
}

export default TaskDetails;
