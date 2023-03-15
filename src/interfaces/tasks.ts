

export interface TaskType {
    id:          number;
    name:        string;
    description: string;
    completed:   number;
    user_id:     number;
    created_at:  Date;
    updated_at:  Date;
}

export interface TaskCreate {
    name:        string;
    description: string;
    completed?:   number;
    user_id?:     number;
}

export interface TasksContextType{
    tasks:  TaskType[];
    setTasks: any;
    onDeleteTask:(idTask:number)=>void;
    toggleCompleteTask:(task:TaskType) =>void;
    onCreateTask:(task:TaskCreate) =>void;
    taskSelected : TaskType;
    setTaskSelected : any;
    onUpdateTask:(task:TaskType) =>void;
}