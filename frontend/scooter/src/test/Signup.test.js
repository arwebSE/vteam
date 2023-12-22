import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { createUser } from '../models/userModel'
// Network mocking
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import Signup from "../views/Signup/Signup";

var mockUserData = {
    username: "DoctorOctopus",
    email: "doc@test.com",
    passwd: "password",
};

jest.mock("../models/userModel", () => {
    return {
        createUser: jest.fn().mockResolvedValue(mockUserData),
    };
});

test("User should be created", async () => {
    const mockAdapter = new MockAdapter(axios)
    mockAdapter.onPost('http://localhost:1337/users').reply(200, mockUserData)
    const user = await createUser();
    expect(user).toEqual(mockUserData);
});

describe("Signup Component", () => {
    test("renders without crashing", () => {
        render(
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
        );
    });
});
