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
                console.error("Stop time must be at least 5 minutes in the future.");
                // Handle the error, display a message, or prevent form submission
                return;
            }

            const price = calculatePrice(stopTime);

            if (user.user_balance < price) {
                console.log("User does not have enough money. Add more money to your account.");
                return;
            }

            // Perform the logic for renting a bike
            // For example, you might update the bike status and store rental information
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
            navigate("/user"); // Redirect to the user dashboard or another page
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
  
          const startPrice = 10;
          const timeBetweenMinutes = ((dateStopTime - dateNow) / 1000) / 60;
          const price = parseInt(startPrice + (timeBetweenMinutes * 2));
          return price;
      } catch (error) {
          console.error(error);
          return 0;
      }
  };
  

  return (
      <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-gray-100 rounded-lg shadow-xl p-12"
      >
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Rent Bike
          </h1>

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
