import React, { useState } from 'react';
import { useEffect } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';

import './css/TaskDetails.css'

const TaskDetails = ({ tasks, handleDescAddition, taskDetail, setTasksDetail }) => {

    const task = tasks.filter(task => task.id === taskDetail)
    const [description, setDescriptionl] = useState(task[0].description || '');

    const handleBackButtonClick = () => {
        setTasksDetail(null)
    };

    const handleInputChange = (e) => {
        setDescriptionl(e.target.value);
    };

    useEffect(() => {
        return () => {
            handleDescAddition(description, taskDetail);
        };
    }, [description, handleDescAddition, taskDetail]); // eslint-disable-next-line

    return (
        <>
            <div className='upper-container'>
                <div>
                    <h2>{task[0].title}</h2>
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
                    defaultValue={task[0].description}
                    onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                />
            </div>
        </>
    );
}

export default TaskDetails;
