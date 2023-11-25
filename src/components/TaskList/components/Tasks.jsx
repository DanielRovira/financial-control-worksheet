import React from "react";

import Task from "./Task";

const Tasks = ({ tasks, handleTaskClick, handleTaskDeletion, setTasksDetail }) => { 
    return (
        <>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task} 
                    handleTaskClick={handleTaskClick} 
                    handleTaskDeletion={handleTaskDeletion}
                    setTasksDetail={setTasksDetail}
                    />
            ))}
        </>
    );
};

export default Tasks;
