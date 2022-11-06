import React, {ChangeEvent, useState} from "react";
import {FilterValueType} from "../App";


type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValueType) => void;
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType;

}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const addTask = () => {
        if (title.trim().length) {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addTask()
        }
    }

    const onClickAllHandler = () => props.changeFilter('all')
    const onClickActiveHandler = () => props.changeFilter('active')
    const onClickCompletedHandler = () => props.changeFilter('completed')

    const tasks = props.tasks.map((t) => {
        const removeTask = () => props.removeTask(t.id)
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeTaskStatus(t.id, newIsDoneValue)
        }
        return <li key={t.id} className={t.isDone ? 'is-done': ''}>
            <input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeStatus}
            /><span>{t.title}</span>
            <button onClick={removeTask}>x</button>
        </li>
    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                type="text"
                onKeyDown={onKeyDownHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className='error'>{error}</div>}
        <ul>
            {tasks}
        </ul>
        <div>
            <button className={props.filter ==='all' ? 'active-filter' : ''} onClick={onClickAllHandler}>All</button>
            <button className={props.filter ==='active' ? 'active-filter' : ''} onClick={onClickActiveHandler}>Active</button>
            <button className={props.filter ==='completed' ? 'active-filter' : ''} onClick={onClickCompletedHandler}>Completed</button>
        </div>
    </div>
}
