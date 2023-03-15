export interface LoginResponse {
    user:  User;
    token: string;
}

export interface LoginProps {
    email:string;
    password:string;
}

export interface RegisterProps {
    email:string;
    name:string;
    password_confirmation:string;
    password:string;
}

export interface User{
    id:         number;
    name:       string;
    email:      string;
    created_at: Date;
    updated_at: Date;
}

export interface AuthContextType{
    user:  User;
    token: string;
    isAuth : boolean;
    setAuthentication : (data:LoginResponse)=>void;
    logout : ()=>void;
}

