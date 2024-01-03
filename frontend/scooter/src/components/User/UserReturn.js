import React, { useState, useEffect } from "react";
import userToBikeModel from "../../models/userToBikeModel";
import userModel from "../../models/userModel";
import { useNavigate } from "react-router-dom";

const RentedBikeList = () => {

    const [bikes, setBikes] = useState([]);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRentedBikes = async () => {
          try {
            const allBikes = await userToBikeModel.getAll();
            const userData = await userModel.getUser(localStorage.userId);

            setUserData(userData);
            
            // Filter bikes based on user_userid
            const userBikes = allBikes.filter(bike => bike.user_userid === parseInt(localStorage.userId));
    
            setBikes(userBikes);
          } catch (error) {
            console.error("Error fetching rented bikes:", error);
          }
        };
    
        fetchRentedBikes();
    }, []);

    const clickHandler = (scooterId) => {
        navigate(`/user/return/${scooterId}`);
    };

    return (
        <div className="flex flex-col p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-600 mb-6 text-center">
                Bikes rented
            </h1>

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
                {bikes.map((bike, index) => (
                    <div
                    key={bike.scooterId}
                    onClick={() => clickHandler(bike.scooterId)}
                    className="cursor-pointer rounded-lg hover:bg-slate-200 flex flex-row bg-white justify-between items-center p-4 shadow-sm transition hover:shadow-md transition duration-300 ease-in-out"
                    >
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold text-gray-800">
                                { bike.scooterId }
                            </h2>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-gray-600"> Start time: {bike.startTime }</p>
                            <p className="text-gray-600"> Stop time: {bike.stopTime }</p>
                            <p className="text-gray-600"> Price: {bike.price }</p>
                        </div>
                        <h1 className="text-lg font-semibold text-gray-800">
                            { index + 1 }
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RentedBikeList;
