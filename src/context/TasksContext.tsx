import { createContext, FC, PropsWithChildren, useState } from "react";
import { createTask, deleteTask, updateTask } from "../api";
import { TaskCreate, TasksContextType, TaskType } from "../interfaces";

const TasksContext = createContext<TasksContextType | null>(null);

const TasksProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskSelected, setTaskSelected] = useState<TaskType | null>();

  const onDeleteTask = (idTask: number) => {
    deleteTask(idTask, (status: boolean, idTask: number, msg: string) => {
        if (status) {
          let tareas = tasks;
          setTasks(tareas.filter((ta) => ta.id !== idTask));
          if(taskSelected?.id === idTask)  setTaskSelected(null);
        }
        //setAlert({ type: status ? "success" : "danger", msg });
      });
  };

  const toggleCompleteTask = (task: TaskType) => {
    let taskUpdated = { ...task, completed: task.completed === 1 ? 0 : 1 };
    onUpdateTask(taskUpdated);
  };

  const onUpdateTask = (task: TaskType)=>{
    updateTask(task, (status: boolean) => {
        if (status) {
          setTasks(
            tasks.map((el) => {
              if (el.id === task.id) return task;
              return el;
            })
          );
        }
      });
  }

  const onCreateTask = (data: TaskCreate) => {
    createTask(data, (res: TaskType | null) => {
      if (res !== null) {
        setTasks([...tasks, res]);
      }
    });
  };

  const data = {
    tasks,
    setTasks,
    onDeleteTask,
    toggleCompleteTask,
    onCreateTask,
    taskSelected,
    setTaskSelected,
    onUpdateTask
  } as TasksContextType;

  return <TasksContext.Provider value={data}>{children}</TasksContext.Provider>;
};

export { TasksProvider };
export default TasksContext;
