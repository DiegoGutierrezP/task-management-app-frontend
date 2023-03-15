
import { useState } from "react";
import { FormTask, ListTasks, Navbar } from "../../components"
import { TaskType } from "../../interfaces";


export const TasksPage = () => {
    

  return (
    <div className="min-hv-100 w-100">
        <Navbar/>

        <div className="container py-4 mt-2">
            

            <div className="row gx-5">

                <div className="col-md-7  ">
                   <ListTasks />
                </div>

                <div className="col-md-5">
                    <FormTask/>
                </div>
            </div>

            
        </div>
    </div>
  )
}
