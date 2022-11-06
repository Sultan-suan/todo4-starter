import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {

   const [tasks, setTasks] = useState([
       {id: v1(), title: 'HTML&CSS', isDone: true},
       {id: v1(), title: 'JS', isDone: false},
       {id: v1(), title: 'React', isDone: false},
       {id: v1(), title: 'Rest API', isDone: false},
       {id: v1(), title: 'GraphQL', isDone: false},
   ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter((t) => !t.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter((t) => t.isDone)
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    const removeTask = (id: string) => {
       const filteredTasks = tasks.filter((t) => t.id !== id);
       setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const task = {id: v1(), title, isDone: false}
        setTasks([...tasks, task])
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        const newTasks = tasks.map((t) => t.id === id ? {...t, isDone} : t)
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn?"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            ></Todolist>
        </div>
    )
}

export default App;
