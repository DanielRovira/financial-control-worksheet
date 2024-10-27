import React from 'react';
import { CgInfo } from 'react-icons/cg'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "./css/Task.css"

const Task = ({ task, handleTaskClick, handleTaskDeletion, setTasksDetail }) => {
    
    const handleTaskDetailsClick = () => {
        setTasksDetail(task)
    }

    return (
        <div 
            className="task-container"
            style={task.completed ? {borderLeft: '7px solid #1976d2', padding: '5px 20px 5px 13px'} : {}}
        >
            <div className='task-title' onClick={() => handleTaskClick(task)}>
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
                    onClick={() => handleTaskDeletion(task)}
                    >
                    <DeleteForeverIcon/>
                </button>
            </div>
        </div>
    );
};

export default Task;
