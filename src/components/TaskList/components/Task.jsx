import React from 'react';
import { CgInfo } from 'react-icons/cg'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { useNavigate } from 'react-router-dom'

import "./css/Task.css"

const Task = ({ task, handleTaskClick, handleTaskDeletion, setTasksDetail }) => {
    // const history = useNavigate();

    const handleTaskDetailsClick = () => {
        // window.description = task.description;
        // history(`/${task.title}`);
        setTasksDetail(task.id)
    }

    return (
        <div 
            className="task-container"
            style={task.completed ? {borderLeft: '7px solid #1976d2', padding: '15px 20px 15px 13px'} : {}}
        >
            <div className='task-title' onClick={() => handleTaskClick(task.id)}>
                {task.title}
            </div>
            
            <div className='buttons-container'>
                <button 
                    className='see-task-detail-button' 
                    onClick={handleTaskDetailsClick}
                    >
                    <CgInfo/>
                </button>
                <button 
                    className='remove-task-button' 
                    onClick={() => handleTaskDeletion(task.id)}
                    >
                    <DeleteForeverIcon/>
                </button>
            </div>
        </div>
    );
};

export default Task;
