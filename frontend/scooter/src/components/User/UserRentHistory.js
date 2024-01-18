import React, { useState, useEffect } from "react";
import logModel from "../../models/logModel";
import userModel from "../../models/userModel";
import { useNavigate } from "react-router-dom";

const RentHistory = () => {

    const [logs, setLogs] = useState([]);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const [showTimeDetails, setShowTimeDetails] = useState({});

    useEffect(() => {
        const fetchLogs = async () => {
          try {
            const userLogs = await logModel.getOneUserLogs(localStorage.userId);
            const userData = await userModel.getUser(localStorage.userId);

            setUserData(userData);
            setLogs(userLogs);
          } catch (error) {
            console.error("Error fetching rented logs:", error);
          }
        };
    
        fetchLogs();
    }, []);

    const toggleDetails = (logId) => {
        setShowTimeDetails((prevDetails) => ({
          ...prevDetails,
          [logId]: !prevDetails[logId],
        }));
      };

    const handleBack = () => {
        navigate("/user/profile");
    };

    return (
        <div className="flex flex-col p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={handleBack}
                    className="cursor-pointer rounded bg-indigo-600 hover:bg-indigo-700 text-lg p-3 text-white shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center"
                >
                    Back to Profile
                </button>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-600">
                    Rent history
                </h1>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-600 mb-6 text-center">
                User logs
            </h1>

            <p className="rounded p-3 text-center text-sm md:text-base lg:text-lg text-gray-700 mb-4 shadow bg-white">
                Your returned bike history. Click on a log for more information.
            </p>

            <div className="flex flex-row justify-between text-lg mb-4">
                <h1 className="font-bold text-gray-700">
                    User: { userData.username }
                </h1>
                
            </div>
            <div className="flex flex-row justify-between text-lg mb-4">
                <h1 className="font-bold text-gray-700">Scooter ID</h1>
                <h1 className="font-bold text-gray-700">ID</h1>
            </div>

            <div className="flex flex-col gap-2">
                {logs.map((log, index) => (
                    <div
                    key={log.logId}
                    className="cursor-pointer rounded-lg hover:bg-slate-200 flex flex-row bg-white justify-between items-center p-4 shadow-sm transition hover:shadow-md transition duration-300 ease-in-out"
                    onClick={() => toggleDetails(log.logId)}
                    >
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold text-gray-800">
                                { log.scooterId }
                            </h2>
                        </div>
                        {showTimeDetails[log.logId] && (
                        <div>
                            <div className="flex flex-col">
                                <p className="text-gray-600"> Start time: {log.startTime }</p>
                                <p className="text-gray-600"> Stop time: {log.stopTime }</p>
                                <p className="text-gray-600"> Return time: {log.returnTime }</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-600"> Price: {log.price }</p>
                                <p className="text-gray-600"> Total price: {log.totalPrice }</p>
                            </div>
                        </div>
                         )}
                         {!showTimeDetails[log.logId] && (
                            <p className="font-semibold text-gray-600"> Price: {log.totalPrice }</p>
                         )}
                        <h1 className="text-lg font-semibold text-gray-800">
                            { index + 1 }
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RentHistory;
