import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginRegister from "./views/LoginRegister";
import { ToastContainer } from "react-toastify";
import Profile from "./views/Profile";
import Create from "./views/Create";
import ItemDetails from "./views/ItemDetails";
import Edit from "./views/Edit";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<h1 className="text-center display-1">Kitchen Noodle :3</h1>} />
                    <Route path="/login" element={<LoginRegister />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/listing/:id" element={<ItemDetails />} />
                    <Route path="/listing/:id/edit" element={<Edit />} />
                </Routes>
            </main>
            <ToastContainer />
        </BrowserRouter>
    );
};

export default App;
