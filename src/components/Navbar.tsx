import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { AuthContextType } from "../interfaces";


export const Navbar = () => {
    const { logout  } = useContext(AuthContext) as AuthContextType;

  return (
    <nav className="navbar navbar-light bg-light bg-white shadow-sm">
      <div className="container">
        <h4 className="navbar-brand my-auto">Tasks App</h4>
        <button onClick={logout} className="btn btn-secondary">Logout</button>
      </div>
    </nav>
  );
};
