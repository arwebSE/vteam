import React from "react";
import ReactSlider from "react-slider";
import simModel from '../models/simulation';
const names = require('../data/names.json');
let sliderValue = 1;

async function addUsers() {
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

function user() {
    return (
        <div class="flex-row h-100">
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                min={1}
                max={1000}
                defaultValue={1}
                onChange={(value) => {
                    sliderValue = value;
                }}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            />
            <button class="p-1.5 rounded bg-gray-800 text-white text-center" onClick={addUsers}>Create Users</button>
        </div>
    );
}

export default user;