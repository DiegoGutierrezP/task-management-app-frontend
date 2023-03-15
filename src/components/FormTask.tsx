import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { createTask } from '../api';
import AuthContext from '../context/AuthContext';
import TasksContext from '../context/TasksContext';
import { AuthContextType, TaskCreate, TasksContextType, TaskType } from '../interfaces';

export const FormTask = () => {
    const { user  } = useContext(AuthContext) as AuthContextType;
    const { onCreateTask,taskSelected,onUpdateTask,setTaskSelected } = useContext(TasksContext) as TasksContextType;
    const {register,handleSubmit,reset, formState: {errors}} = useForm<TaskCreate>();

    const onSubmit = handleSubmit((data)=>{
        if(taskSelected?.id){
            let taskUpdated = {...taskSelected,...data};
            onUpdateTask(taskUpdated);
            setTaskSelected(null);
        }else{
            data.user_id = user.id;
            data.completed = 0;
            onCreateTask(data);
        }
        reset({name:'',description:''})
    })

    useEffect(() => {
      if(taskSelected?.id){
        reset({name:taskSelected.name,description:taskSelected.description})
      }else{
        reset({name:'',description:''})
      }
    }, [taskSelected])
    

  return (
    <div className=''>
        <div className='d-flex align-items-center justify-content-between'>
            <h3 className=''>{taskSelected?.id ? 'Update Task' : 'Create Task'}</h3>
            {taskSelected?.id && <button onClick={()=>setTaskSelected(null)} className='btn fas fa-close'>
            </button>}
        </div>
        
        <hr/>
        <form onSubmit={onSubmit} >
            <div className='form-group mb-2'>
                <label>Task Name</label>
                <input {...register("name",{required:true })} type='text' name='name' className='form-control ' />
                <small className="text-danger">{errors.name && 'The task name is required'}</small>
            </div>
            <div className='form-group mb-2'>
                <label>Description</label>
                <textarea {...register("description")} rows={3} name='description' className='form-control ' >

                </textarea>
            </div>
            <button className='float-end btn btn-primary mt-2'>{!taskSelected?.id ? 'Create' : 'Update'}</button>
        </form>
    </div>
  )
}
