import React, { useState, useEffect } from 'react';
// import {v4 as uuidv4} from 'uuid'
// import externalData from './data.json'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import TaskDetails from './components/TaskDetails';
import './components/css/App.css'
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';

const TaskList = ({ setMainSheetType }) => {
    const language = useAtomValue(languageAtom);
    const lang = require(`components/Languages/${language}.json`);
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [taskDetail, setTasksDetail] = useState(null);

    const getData = async () => {
        const res = await
        fetch(`/api/tasks/list`, { method:'GET', credentials: 'include' })
            .then(response => response.json())
            .catch(error => console.log(error))

        if (res?.status === 200) {
            localStorage.setItem('tasks', JSON.stringify(res.post))
            setTasks(res.post)
        }
    }

    async function insertDocument(item) {
        await fetch(`/api/tasks/add`,
            {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(item)
            })
        .then(() => getData())
        .catch(console.error)
    }

    async function updateDocument(item) {
        await fetch(`/api/tasks/update`,
        {
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(() => getData())
        .catch(console.error)
    }

    async function deleteDocument(item) {
        await fetch(`/api/tasks/delete`,
        {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(() => getData())
        .catch(console.error)
    }

    useEffect(() => {
        setMainSheetType && setMainSheetType('TaskList');
        getData()
    }, [setMainSheetType]);

    const handleTaskClick = (item) => {
        let newItem = JSON.parse(JSON.stringify(item))
        newItem.completed = !item.completed
        const newTask = tasks.map(task => {
            if (task._id === item._id) return { ...task, completed: !task.completed };
            return task;
        });
        setTasks(newTask);
        updateDocument(newItem);
    };

    const handleTaskAddition = (taskTitle) => {
        const newTask = {
                title: taskTitle,
                // id: uuidv4(),
                completed: false,
            }

        insertDocument(newTask);
    };

    const handleTaskDeletion = (task) => {
        deleteDocument(task);
    };

    const handleDescAddition = (taskDesc, taskId) => {
        let item = {
            _id: taskId,
            description: taskDesc
        }
        updateDocument(item)
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
                    <TaskDetails task={taskDetail} handleDescAddition={handleDescAddition} setTasksDetail={setTasksDetail} /> :
                    <Main/>
                }
            </div>
        </div>
    )
};

export default TaskList;
