import { useContext, useState } from "react";
import { useForm,Resolver } from "react-hook-form"
import { NavLink } from "react-router-dom"
import { login } from "../../api";
import AuthContext from "../../context/AuthContext";
import { AuthContextType, LoginProps, LoginResponse } from "../../interfaces";

export const LoginPage = () => {

    const { setAuthentication  } = useContext(AuthContext) as AuthContextType;
    const {register,handleSubmit, formState: {errors}} = useForm<LoginProps>();
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState<string>('');


    const callbackLogin = (status : boolean,data: (LoginResponse | string))=>{
        if(status){
            setAuthentication(data as LoginResponse);
        }else{
            setAlert(data as string || 'Ocurrio un error');
        }
    }

    const onSubmit = handleSubmit((data)=>{
        login(data,setLoading,callbackLogin)
    })

  return (
    <div className="d-flex w-100 min-vh-100 align-items-center justify-content-center">
        <form onSubmit={onSubmit}>
            <div className="card" style={{width:'350px'}}>
                <div className="card-header">
                    <h5 className="m-auto">Login</h5>
                </div>
                <div className="card-body">

                {alert && <div className="alert alert-danger alert-dismissible" role="alert">
                    {alert}
                    <button onClick={()=>setAlert('')} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}

                    <div className="form-group mb-3">
                        <label className="mb-1">Email:</label >
                        <input {...register("email",{required:true })} id="email" name="email" type='email' className="form-control" placeholder="Enter email" />
                        <small className="text-danger">{errors.email && 'The email is required'}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label className="mb-1">Password:</label >
                        <input {...register("password",{required:true})} type='password' name="password" className="form-control" placeholder="password" />
                        <small className="text-danger">{errors.password && 'The password is required'}</small>
                    </div>
                    
                    <span>No tienes una cuenta? <NavLink to={'/auth/register'} className="">Registrarse</NavLink></span>
                    <br />
                    <button disabled={loading} type="submit" className="btn btn-primary w-100 mt-3">Login</button>

                </div>
            </div>
        </form>
    </div>
  )
}
