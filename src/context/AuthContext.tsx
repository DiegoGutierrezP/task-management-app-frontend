import { createContext, FC, PropsWithChildren, useState } from "react";
import { AuthContextType, LoginResponse, User } from "../interfaces";
import { logout as logoutAuth } from '../api/taskApi';

let initialUser = localStorage.getItem('dataUser') ? JSON.parse(localStorage.getItem("dataUser") as string) : null;
let initialToken = localStorage.getItem('token') || '';


const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<User | null>(initialUser);
    const [token, setToken] = useState<string>(initialToken);
    const [isAuth, setIsAuth] = useState<boolean>((initialUser && initialToken) ? true : false);

    const setAuthentication = (data:LoginResponse)=>{
        setUser(data.user);
        setToken(data.token);
        setIsAuth(true);
        localStorage.setItem("dataUser",JSON.stringify(data.user));
        localStorage.setItem("token",data.token);
    }

    const logout = ()=>{
        logoutAuth().then(res => {
            setUser(null);
            setToken('');
            setIsAuth(false);
            
            localStorage.removeItem("dataUser");
            localStorage.removeItem("token");
        }).catch(err => console.log(err));   
    }


  const data = {user,token,setAuthentication,logout,isAuth} as AuthContextType;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export {AuthProvider};
export default AuthContext;