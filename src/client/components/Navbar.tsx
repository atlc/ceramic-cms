import * as React from "react";
import { NavLink } from "react-router-dom";
import useCheckAuth from "../hooks/useCheckAuth";

const Navbar = () => {
    const [isAuthed] = useCheckAuth();

    return (
        <div className="bg-secondary shadow">
            <NavLink className={isActive => "btn btn-outline-primary m-2 text-primary" + (isActive ? "text-dark" : "")} to="/">
                Home
            </NavLink>
            {isAuthed && <div className="btn-danger">LOGGED IN LOL</div>}
            <NavLink className={isActive => "btn btn-outline-primary m-2 text-primary" + (isActive ? "text-dark" : "")} to="/login">
                Login
            </NavLink>
        </div>
    );
};

export default Navbar;
