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
import EditUser from "./views/Admin/EditUser/EditUser";
import Signup from "./views/Signup/Signup";
import EditBike from "./views/Admin/EditBike/EditBike";
import Sim from "./views/Sim/Sim";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/bike" element={<AdminBike />} />
                    <Route path="/admin/zone" element={<AdminZone />} />

                    <Route path="/admin/user/:userid" element={<EditUser />} />
                    <Route path="/admin/bike/edit/:id" element={<EditBike />} />

                    <Route path="/admin/user" element={<AdminUser />} />
                    <Route path="/admin/user/:userid" element={<AdminUser />} />
                    <Route path="/admin/simulation" element={<Sim />} />
                </Routes >
            </Router >
        </AuthProvider >
    </React.StrictMode >
);
