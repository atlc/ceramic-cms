import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginRegister from "./views/LoginRegister";
import { ToastContainer } from "react-toastify";
import Profile from "./views/Profile";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="container my-5">
                <Routes>
                    <Route path="/" element={<h1>Home lol</h1>} />
                    <Route path="/login" element={<LoginRegister />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>
            <ToastContainer />
        </BrowserRouter>
    );
};

export default App;
