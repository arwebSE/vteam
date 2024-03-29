import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./util/AuthContext";
import "leaflet/dist/leaflet.css";
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
import EditProfile from "./views/User/Profile/EditProfile/EditProfile";
import ProfileAddMoney from "./views/User/Profile/ProfileAddMoney/ProfileAddMoney";
import RentBike from "./views/User/Rent/RentBike";
import UserReturn from "./views/User/Return/UserReturn"
import ReturnBike from "./views/User/Return/ReturnBike"
import LowBattery from "./views/LowBattery/LowBattery";
import UserHistory from "./views/User/Profile/History/userHistory"

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
                    <Route path="/admin/lowbattery" element={<LowBattery />} />

                    <Route path="/user" element={<User />} />
                    <Route path="/user/rent" element={<UserRent />} />
                    <Route path="/user/profile" element={<UserProfile />} />
                    <Route path="/user/profile/edit" element={<EditProfile />} />
                    <Route path="/user/profile/bank" element={<ProfileAddMoney />} />
                    <Route path="/user/rent/bike/:id" element={<RentBike />} />
                    <Route path="/user/return" element={<UserReturn />} />
                    <Route path="/user/return/:id" element={<ReturnBike />} />
                    <Route path="/user/profile/history" element={<UserHistory />} />

                </Routes >
            </Router >
        </AuthProvider >
    </React.StrictMode >
);
