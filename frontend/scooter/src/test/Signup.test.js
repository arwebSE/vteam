import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"

import Signup from "../views/Signup/Signup";



describe("Signup Component", () => {
    test("renders without crashing", () => {
        render(
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
        );
    });
});
