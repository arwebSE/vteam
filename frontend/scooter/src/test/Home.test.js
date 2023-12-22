import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"

import Home from "../views/Home/Home";



describe("Frontend: Home Component", () => {
    test("renders without crashing", () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
    });
});
