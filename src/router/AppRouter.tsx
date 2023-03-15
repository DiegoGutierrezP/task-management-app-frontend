import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { AuthContextType } from "../interfaces";
import { LoginPage, RegisterPage } from "../pages/auth";
import { TasksPage } from "../pages/tasks";

export const AppRouter = () => {
  const { isAuth } = useContext(AuthContext) as AuthContextType;

  return (
    <Routes>
      {
      isAuth ? (
        <>
         <Route path="/tasks" element={<TasksPage />} />
        </>
      ) : (
        <>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </>
      )
      }

      <Route path='*' element={<Navigate to={isAuth ? '/tasks' : '/auth/login'} />} />
    </Routes>
  );
};
