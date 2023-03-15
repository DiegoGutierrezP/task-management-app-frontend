import React, { FC, useContext, useEffect, useState } from "react";
import { getListTasks, getTasksByName } from "../api";
import TasksContext from "../context/TasksContext";
import { TasksContextType, TaskType } from "../interfaces";
import { Task } from "./Task";

interface Props {}

export const ListTasks: FC<Props> = () => {
  const { tasks, setTasks, onDeleteTask } = useContext(
    TasksContext
  ) as TasksContextType;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState({ type: "success", msg: "" });

  const onChangeSearch = (e: any) => {
    const { value, name } = e.target;
    setSearch(value);
    getTasksByName(value, setTasks);
  };

  /* const callbackDelete = (status: boolean, idTask: number, msg: string) => {
    if (status) {
      let tareas = tasks;
      setTasks(tareas.filter((ta) => ta.id !== idTask));
    }
    setAlert({ type: status ? "success" : "danger", msg });
  }; 

  const handleDeleteTask = (idTask: number) =>
    onDeleteTask(idTask, callbackDelete);*/

  useEffect(() => {
    getListTasks(setTasks,setLoading);
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between p-0 pr-5 mb-3">
        <h3 className="">My Tasks</h3>

        <input
          type="search"
          onChange={onChangeSearch}
          name="search"
          value={search}
          className="form-control form-control-sm rounded-pill"
          placeholder="Search by name"
          style={{ width: "220px" }}
        />
      </div>

      {alert.msg && (
        <div
          className={`alert alert-${alert.type} alert-dismissible`}
          role="alert"
        >
          {alert.msg}
          <button
            onClick={() => setAlert({ type: "success", msg: "" })}
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <div
        className="d-flex flex-column  mb-4"
        style={{ overflowY: "auto", maxHeight: "700px" }}
      >
        {
            loading ? 
            <h6 className="text-center py-4">Loading Tasks...</h6>:

            (
                tasks.length === 0 ?
                <h6 className="text-center py-4">No records found</h6>:
                tasks.map((t) => (
                <Task key={t.id} task={t}  />
              ))
            )
        }
       
      </div>
    </div>
  );
};
