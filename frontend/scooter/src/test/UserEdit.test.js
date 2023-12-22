import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import UserEdit from "../components/UserEdit";

var mockUserData = {
    username: "Gaylon.Widuch654",
    email: "Gaylon.Widuch@test.com",
    passwd: "password",
    userrole: "user",
    userId: "1",
};

jest.mock("../models/userModel", () => {
    return {
        getUser: jest.fn().mockResolvedValue(mockUserData),
    };
});



describe("UserEdit Component", () => {
    test("renders without crashing", () => {
        render(
            <BrowserRouter>
                <UserEdit />
            </BrowserRouter>
        );
        //expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
    });
});
