import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TasksApp from "./TasksApp";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <TasksApp />
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  </React.StrictMode>
);
