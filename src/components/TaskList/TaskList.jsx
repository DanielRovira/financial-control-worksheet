import React, { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid'
import externalData from './data.json'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import TaskDetails from './components/TaskDetails';
import './components/css/App.css'
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const TaskList = ({ setMainSheetType }) => {
    const data = localStorage.getItem("tasks");
    const [tasks, setTasks] = useState(data ? JSON.parse(data) : externalData);
    const [taskDetail, setTasksDetail] = useState(null);

    useEffect(() => {
        setMainSheetType('TaskList');
    }, [setMainSheetType]);

        //Import from API
        // useEffect(() => {
        //     const fetchTasks = async () => {
        //          const response  = await fetch(
        //              "https://jsonplaceholder.typicode.com/todos?_limit=4"
        //          );
        //          const responseJson = await response.json();
        //          setTasks(responseJson);
        //     };

        //     fetchTasks();
        //     console.log(data[0].title)
        // }, []);

        const handleTaskClick = (taskId) => {
            const newTask = tasks.map(task => {
                if (task.id === taskId) return { ...task, completed: !task.completed };

                return task;
            });

            setTasks(newTask);
            localStorage.setItem("tasks", JSON.stringify(newTask));
        };

        const handleTaskAddition = (taskTitle) => {
            const newTask = [
                ...tasks, 
                {
                    title: taskTitle,
                    id: uuidv4(),
                    completed: false,
                },
            ];

            setTasks(newTask);
            localStorage.setItem("tasks", JSON.stringify(newTask));
        };

        const handleTaskDeletion = (taskId) => {
            const newTask = tasks.filter(task => task.id !== taskId)

            setTasks(newTask);
            localStorage.setItem("tasks", JSON.stringify(newTask));
        };

        const handleDescAddition = (taskDesc, taskTitle) => {
            const newTask = tasks.map(task => {
                if (task.id === taskTitle) return { ...task, description: taskDesc };
                return task;
            })
            
            setTasks(newTask);
            localStorage.setItem("tasks", JSON.stringify(newTask));
        };

        const Main = () => {
            return (
                <>
                    <AddTask handleTaskAddition={handleTaskAddition} />
                    <Tasks 
                        tasks={tasks} 
                        handleTaskClick={handleTaskClick} 
                        handleTaskDeletion={handleTaskDeletion}
                        setTasksDetail={setTasksDetail}
                    /> 
                </>
            )
        };

        return (
            <div className='TaskListContainer'>
                <div className='TaskListHeader' >
                    <h1>{lang.tasks}</h1>
                </div>
                <div className='TaskList'>
                    {taskDetail ? 
                        <TaskDetails tasks={tasks} handleDescAddition={handleDescAddition} taskDetail={taskDetail} setTasksDetail={setTasksDetail} /> :
                        <Main/>
                    }
                </div>
            </div>
        )
};

export default TaskList;
