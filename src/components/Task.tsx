import React, { FC, useContext, useState } from 'react'
import { TasksContextType, TaskType } from '../interfaces'
import { updateTask } from '../api/taskApi';
import TasksContext from '../context/TasksContext';

interface Props {
    task: TaskType;
}

export const Task:FC<Props> = ({task}) => {

    const { toggleCompleteTask,setTaskSelected ,onDeleteTask } = useContext(TasksContext) as TasksContextType;
    
    const handleToggleComplete = (e:any)=>{
        e.stopPropagation();
        toggleCompleteTask(task)
    }

    const handleDeleteComplete = (e:any)=>{
        e.stopPropagation();
        onDeleteTask(task.id);
    }

  return (
    <div onClick={()=>setTaskSelected(task)} style={{background:'#d4d4d4',cursor:'pointer'}} className='text-white rounded w-90  border border border-dark d-flex align-items-center justify-content-between p-2 mb-2 '>
        <h5 title={task.name} className='text-truncate '>{task.name}</h5>
        &nbsp;
        <div className='d-flex '>
            <button onClick={handleToggleComplete} className={`btn btn-sm ${task.completed === 1 ? 'btn-success' : 'btn-warning'}`}>{task.completed === 1 ? 'Completed' : 'Incomplete' }</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={handleDeleteComplete} className='btn btn-danger  rounded-pill fas fa-trash'>
            </button>
        </div>
        
    </div>
  )
}
