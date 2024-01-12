import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import withAuth from "../../../util/withAuth";

import "./style.css";
import UserList from "../../../components/UserList";
import UserEdit from "../../../components/UserEdit";

// Mock imports
import withAuthMock from "../../../test/Auth.mock";
const AdminUser = () => {
    const userRole = localStorage.getItem('userRole');

    const navigate = useNavigate();

    useEffect(() => {
        if (userRole !== "admin") {
            navigate('/home');
        }
    }, [userRole, navigate]);

    const [refreshList, setRefreshList] = useState(false);
    const { userid } = useParams();
    const location = useLocation();

    useEffect(() => {
        if (!userid) {
            // Triggered when navigating back to user list
            setRefreshList((prev) => !prev);
        }
    }, [userid, location.pathname]); // Depend on userid and pathname

    return (
        <div className="mt-20">
            {userid ? (
                <UserEdit key={userid} userId={userid} />
            ) : (
                <UserList refresh={refreshList} setRefresh={setRefreshList} />
            )}
        </div>
    );
};


const exportedComponent = process.env.NODE_ENV === "test" ? withAuthMock(AdminUser) : withAuth(AdminUser);
export default exportedComponent
