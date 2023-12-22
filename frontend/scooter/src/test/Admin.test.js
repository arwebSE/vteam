import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"

import Admin from "../views/Admin/Admin";
import Adminbike from "../views/Admin/Bike/AdminBike";
import AdminEditbike from "../views/Admin/EditBike/EditBike";
import AdminEditUser from "../views/Admin/EditUser/EditUser";
import AdminUser from "../views/Admin/User/AdminUser";

const MockAuthContext = {
    isLoggedIn: true
};

const AuthContext = React.createContext(MockAuthContext);



describe("Frontend: Admin Component", () => {
    test("Main Admin renders without crashing", () => {
        render(
            <AuthContext.Provider value={MockAuthContext} >
                <Admin />
            </AuthContext.Provider>
        );
    });
    test("Admin bike renders without crashing", () => {
        render(
            <BrowserRouter>
                <Adminbike />
            </BrowserRouter>
        );
    });
    test("Admin edit bike renders without crashing", () => {
        render(
            <BrowserRouter>
                <AdminEditbike />
            </BrowserRouter>
        );
    });
    test("Admin edit user renders without crashing", () => {
        render(
            <BrowserRouter>
                <AdminEditUser />
            </BrowserRouter>
        );
    });
    test("Admin user renders without crashing", () => {
        render(
            <BrowserRouter>
                <AdminUser />
            </BrowserRouter>
        );
    });

});
