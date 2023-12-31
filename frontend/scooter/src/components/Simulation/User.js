import React, { useState } from "react";
import ReactSlider from "react-slider";
import simModel from '../../models/simulation';
const names = require('../../data/names.json');

function User() {
    const [sliderValue, setSliderValue] = useState(1);

    async function addUsers(e) {
        e.preventDefault();
        const startTime = new Date();

        for (let i = 0; i < sliderValue; i++) {
            let randomFirst = Math.random() * (names.firstName.length - 1) + 1;
            let randomLast = Math.random() * (names.lastName.length - 1) + 1;
            let userName = names.firstName[parseInt(randomFirst)] + "." + names.lastName[parseInt(randomLast)];
            let email = names.firstName[parseInt(randomFirst)] + "." + names.lastName[parseInt(randomLast)] + "@example.com";
            await simModel.createUser(userName, email, "password");
        }

        const endTime = new Date();
        const duration = (endTime - startTime) / 1000;
        console.log(`Execution time: ${duration} seconds`);
    }

    return (
        <div className="flex-row h-100">
            {/* <form className="flex flex-col items-center" onSubmit={addUsers}>
                <label htmlFor="quantity">Number of Users: {sliderValue}</label>
                <input type="range" id="quantity" name="quantity" min="1" max="1000" defaultValue="1" onChange={(e) => setSliderValue(e.target.value)}></input>
                <button className="p-1.5 rounded bg-gray-800 text-white text-center" onClick={addUsers}>Create Users</button>
            </form> */}
        </div>
    );
}

export default User;