import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./util/AuthContext";

import "./index.css";
import Navbar from "./components/Navbar";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import Admin from "./views/Admin/Admin";
import AdminUser from "./views/Admin/User/AdminUser";
import AdminBike from "./views/Admin/Bike/AdminBike";
import AdminZone from "./views/Admin/Zone/AdminZone";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/user" element={<AdminUser />} />
                    <Route path="/admin/bike" element={<AdminBike />} />
                    <Route path="/admin/zone" element={<AdminZone />} />
                </Routes>
            </Router>
        </AuthProvider>
    </React.StrictMode>
);
