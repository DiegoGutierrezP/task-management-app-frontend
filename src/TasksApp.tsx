import { AppRouter } from "./router/AppRouter"


function TasksApp() {

  return (
    <div className=" w-100 min-vh-100" style={{background:'#f5f5f5'}}>
      <div className="">
        <AppRouter/>
      </div>
    </div>
  )
}

export default TasksApp
