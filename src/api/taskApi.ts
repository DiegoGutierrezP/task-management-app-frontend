import axios from 'axios';
import { TaskCreate, TaskType } from '../interfaces';

const BASE_URL = import.meta.env.VITE_BACKEND_API;

const taskApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
}) 

taskApi.interceptors.request.use(async req => {
    //console.log(localStorage.getItem('token'));
    let token = localStorage.getItem('token') || '';
    req.headers.Authorization = `Bearer ${token || ''}`
    return req;
}) 


export const logout = async () =>{
    try{
        let {data} = await taskApi.post('/logout')
        console.log(data);
    }catch(err : any){
        console.log(err);
    }
    return Promise.resolve(true);
}

export const getListTasks = async (setTasks:any,setLoading:any)=>{
    try{
        setLoading(true);
        let {data} = await taskApi.get('/tasks')
        let tasks = data.data as TaskType[];
        setTasks(tasks);
    }catch(err){
        console.log(err);
        setTasks([]);
    }finally{
        setLoading(false);
    }
}

export const getTasksByName = async (nameTask:string,setTasks:any)=>{
    try{
        let {data} = await taskApi.get(`/tasks/byName?name=${nameTask}`)
        let tasks = data.data as TaskType[];
        setTasks(tasks);
    }catch(err){
        console.log(err);
        setTasks([]);
    }
    
}

export const deleteTask = async (idTask:number,callbackDeleteTask:any)=>{
    try{
        let {data} = await taskApi.delete(`/tasks/${idTask}`)
        
        callbackDeleteTask(true,idTask,data.msg)
    }catch(err:any){
        console.log(err);
        let msg = err?.response?.data?.msg || 'Ocurrio un error';
        callbackDeleteTask(false,idTask,msg)
    }
}

export const updateTask = async (task:TaskType,callbackUpdateTask:any)=>{
    try{
        let {data} = await taskApi.put(`/tasks/${task.id}`,task)
        
        callbackUpdateTask(true)
    }catch(err:any){
        console.log(err);
        callbackUpdateTask(false)
    }
}

export const createTask = async (task:TaskCreate,callback:any)=>{
    try{
        let {data} = await taskApi.post(`/tasks`,task)
        
        callback(data.data);
    }catch(err:any){
        console.log(err);
        callback(null);
    }
}