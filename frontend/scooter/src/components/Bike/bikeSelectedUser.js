import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import bikeModel from "../../models/bikeModel";
import userModel from "../../models/userModel";
import userToBikeModel from "../../models/userToBikeModel";

const BikeRent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const scooterId = location.pathname.split("/").pop();
    const dateNows = new Date();
    const dateStartTimeString = dateNows.toLocaleString("sv-SE");

    const [battery, setBattery] = useState("");
    const [startTime, setStartTime] = useState("");
    const [stopTime, setStopTime] = useState("");
    const [money, setMoney] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchBike = async () => {
            try {
                const bike = await bikeModel.getBike(scooterId);
                const user = await userModel.getUser(localStorage.userId);
                setMoney(user.user_balance);
                setBattery(bike.battery);
                setStartTime(dateStartTimeString);
                setUser(user);
            } catch (error) {
                console.error("Failed to fetch bike:", error);
            }
        };

        fetchBike();
    }, [scooterId, dateStartTimeString]);

    const isStopTimeValid = () => {
        const dateNow = new Date();
        const dateStopTime = new Date(stopTime);
        return dateStopTime > new Date(dateNow.getTime() + 4 * 60000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!isStopTimeValid()) {
                // Användaren måste sätta minst 5 minuter hyrtid.
                alert("Stop time must be at least 5 minutes in the future.");
                return;
            }

            const price = calculatePrice(stopTime);

            if (user.user_balance < price) {
                alert("User does not have enough money. Add more money to your account.");
                return;
            }

            const userToBikeData = {
                user_userid: localStorage.userId,
                scooterId: scooterId,
                startTime: startTime,
                stopTime: stopTime,
                price: price,
            };

            await bikeModel.rentBike(scooterId);
            await userToBikeModel.create(userToBikeData);
            await userModel.removeMoney(localStorage.userId, price);
            console.log("Bike rented successfully.");
            navigate("/user");
        } catch (error) {
            console.error("Failed to rent bike:", error);
        }
    };

    const calculatePrice = (stopTime) => {
      try {
            if (!stopTime) {
                return 0;
            }
          const dateNow = new Date();
  
          const dateStopTime = new Date(stopTime);
  
          // Kostnad för hyrning, 15 + 2/min
          const startPrice = 15;
          const timeBetweenMinutes = ((dateStopTime - dateNow) / 1000) / 60;
          const price = parseInt(startPrice + (timeBetweenMinutes * 2));
          return price;
      } catch (error) {
          console.error(error);
          return 0;
      }
  };
  
  const handleBack = () => {
    navigate("/user/rent");
  };

  return (
      <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-gray-100 rounded-lg shadow-xl p-12"
      >
        <div className="flex justify-start mb-6">
          <button
              onClick={handleBack}
              className="cursor-pointer rounded bg-indigo-600 hover:bg-indigo-700 text-lg p-3 text-white shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center"
          >
            Back to map
          </button>
        </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600 mb-8 font-sans text-center">
              Rent Bike
          </h1>

        <p className="rounded p-3 text-center text-sm md:text-base lg:text-lg text-gray-700 shadow bg-white mb-12">
        Fill in stop time and press rent. Minimum time is 5 minutes.
        </p>

          <h2 className="text-lg font-semibold mb-2">Balance: {money}</h2>

          <label className="text-lg font-semibold mb-2">Bike ID:</label>
          <input
              className="rounded p-3 mb-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              type="text"
              defaultValue={scooterId}
              readOnly
          />

          <label className="text-lg font-semibold mb-2">Battery:</label>
          <input
              className="rounded p-3 mb-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              type="number"
              value={battery}
              readOnly
          />

          <label className="text-lg font-semibold mb-2">Stop time:</label>
          <input
              className="rounded p-3 mb-4 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              type="datetime-local"
              value={stopTime}
              onChange={(e) => setStopTime(e.target.value)}
          />

            <label className="text-lg font-semibold mb-2">Price:</label>
                <input
                    className="rounded p-3 mb-4 shadow focus:outline-none"
                    type="number"
                    style={{ border: isStopTimeValid() ? '1px solid #008000' : '2px solid #ef4444' }}
                    value={calculatePrice(stopTime)}
                    readOnly
            />

          <button
              className="w-full rounded bg-indigo-600 hover:bg-indigo-700 text-white text-lg p-3 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
              type="submit"
          >
              Rent
          </button>
      </form>
  );
};

export default BikeRent;
