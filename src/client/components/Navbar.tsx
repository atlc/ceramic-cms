import * as React from "react";
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useCheckAuth from "../hooks/useCheckAuth";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useCheckAuth();
    const nav = useNavigate();

    // Call useLocation hook to return a new state change upon a URL change and re-validate the user's token
    const location = useLocation();
    useEffect(() => {
        const check = async () => {
            const res = await fetch("/api/token_check", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            setIsLoggedIn(res.ok);

            if (!res.ok) nav("/login");
        };
        check();
    }, [location.pathname]);

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.removeItem("token");
        nav("/login");
    };

    const loggedOutLinks = (
        <NavLink className="btn rounded-pill btn-info m-2 text-dark" to="/login">
            Login
        </NavLink>
    );

    const loggedInLinks = (
        <>
            <NavLink className="btn rounded-pill btn-info m-2 text-dark" to="/profile">
                Profile
            </NavLink>
            <NavLink className="btn rounded-pill btn-info m-2 text-dark" to="/create">
                Create
            </NavLink>
            <button className="btn rounded-pill btn-info m-2 text-dark" onClick={handleLogout}>
                Logout
            </button>
        </>
    );

    return (
        <div className="bg-dark px-2 mb-5 d-flex shadow-lg">
            <div className="col-10">{isLoggedIn ? loggedInLinks : loggedOutLinks}</div>
            <div onClick={() => nav("/")} className="col-1 d-flex justify-content-center align-items-center">
                <div style={{ fontSize: "2.5rem" }}>🐱</div>
            </div>
        </div>
    );
};

export default Navbar;
