import React from "react";
//import AddZone from "../../../components/Zone/AddZone";
import ZoneMap from "../../../components/Zone/ZoneMap";
import withAuth from "../../../util/withAuth";

import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import "./style.css";

function AdminZone() {
    const userRole = localStorage.getItem('userRole');

    const navigate = useNavigate();

    useEffect(() => {
        if (userRole !== "admin") {
            navigate('/home');
        }
    }, [userRole, navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <ZoneMap />
        </div>
    );
}

export default withAuth(AdminZone);
