import "./style.css";
import React from "react";
import LowBatteryMap from "../../components/LowBatteryBikes/LowBatteryMap";

import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function LowBattery() {
    const userRole = localStorage.getItem('userRole');

    const navigate = useNavigate();

    useEffect(() => {
        if (userRole !== "admin") {
            navigate('/home');
        }
    }, [userRole, navigate]);

    return (
        <>
            <LowBatteryMap />
        </>
    );

}

export default LowBattery;