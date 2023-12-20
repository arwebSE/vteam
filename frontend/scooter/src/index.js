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
import User from "./views/User/User";
import UserRent from "./views/User/Rent/UserRent";
import UserProfile from "./views/User/Profile/UserProfile";
import LoginAuth from "./views/Oauthlogin/Oauth";
import User from "./views/User/User";
import UserRent from "./views/User/Rent/UserRent";
import UserProfile from "./views/User/Profile/UserProfile";
import LoginAuth from "./views/Oauthlogin/Oauth";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/oauthlogin" element={<LoginAuth />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/bike" element={<AdminBike />} />
                    <Route path="/admin/zone" element={<AdminZone />} />
                    <Route path="/admin/user/:userid" element={<EditUser />} />
                    <Route path="/admin/bike/edit/:id" element={<EditBike />} />

                    <Route path="/admin/user" element={<AdminUser />} />
                    <Route path="/admin/user/:userid" element={<AdminUser />} />

                    <Route path="/user" element={<User />} />
                    <Route path="/user/rent" element={<UserRent />} />
                    <Route path="/user/profile" element={<UserProfile />} />
                </Routes >
            </Router >
        </AuthProvider >
    </React.StrictMode >
);
