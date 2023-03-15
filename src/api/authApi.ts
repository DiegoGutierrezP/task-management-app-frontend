import axios from "axios";
import { LoginProps, LoginResponse, RegisterProps, User } from '../interfaces/auth';

const BASE_URL = import.meta.env.VITE_BACKEND_API;

const authApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
}) 

export const login = async (formLogin:LoginProps,setLoading:any, callBackLogin:any) =>{
    try{
        setLoading(true);
        let {data} = await authApi.post<LoginResponse>('/auth/login',formLogin)
        callBackLogin(true,data)
    }catch(err : any){
        console.log(err);
        let msg = err?.response?.data?.msg || 'Ocurrio un error';
        callBackLogin(false,msg)
    }finally{
        setLoading(false);
    }
}

export const registerUser = async (formRegister:RegisterProps,setLoading:any, callBackRegister:any) =>{
    try{
        setLoading(true);
        let {data} = await authApi.post<User>('/auth/register',formRegister)
        callBackRegister(true,data)
    }catch(err : any){
        console.log(err);
        let msg = err?.response?.data?.msg || 'Ocurrio un error';
        callBackRegister(false,msg)
    }finally{
        setLoading(false);
    }
}
