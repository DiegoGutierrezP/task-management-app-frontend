import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';
import { RegisterProps, User } from '../../interfaces';


export const RegisterPage = () => {

    const {register,handleSubmit, formState: {errors}} = useForm<RegisterProps>();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<string>('');
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data)=>{
        registerUser(data,setLoading,(status:boolean,data:(User | string))=>{
            if(status){
                navigate('auth/login');
            }else{
                setAlert(data as string);
            }
        })
    })

  return (
    <div className="d-flex w-100 min-vh-100 align-items-center justify-content-center">
        <div className="card" style={{width:'350px'}}>
            <div className="card-header">
                <h5 className="m-auto">Register</h5>
            </div>
            <form onSubmit={onSubmit}>
            <div className="card-body">
                {alert && <div className="alert alert-danger alert-dismissible" role="alert">
                    {alert}
                    <button onClick={()=>setAlert('')} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}

                <div className="form-group mb-2">
                    <label className="mb-1">Name:</label >
                    <input {...register("name",{required:true })} name="name" type='text' className="form-control" placeholder="Nombre" />
                    <small className="text-danger">{errors.name && 'The name is required'}</small>
                </div>

                <div className="form-group mb-2">
                    <label className="mb-1">Email:</label >
                    <input  {...register("email",{required:true })} name="email" type='email' className="form-control" placeholder="Enter email" />
                    <small className="text-danger">{errors.email && 'The email is required'}</small>
                </div>
                <div className="form-group mb-2">
                    <label className="mb-1">Password:</label >
                    <input {...register("password",{required:true })} name="password" type='password' className="form-control" placeholder="password" />
                    <small className="text-danger">{errors.password && 'The password is required'}</small>
                </div>
                <div className="form-group mb-2">
                    <label className="mb-1">Confirm Password:</label >
                    <input {...register("password_confirmation",{required:true })} name="password_confirmation" type='password' className="form-control" placeholder="confirm password" />
                    <small className="text-danger">{errors.password_confirmation && 'The password_confirmation is required'}</small>
                </div>

                <button disabled={loading} type='submit' className="btn btn-primary w-100 mt-3">Registrarse</button>

            </div>
            </form>
        </div>
    </div>
  )
}
