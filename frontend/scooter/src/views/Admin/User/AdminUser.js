import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import withAuth from "../../../util/withAuth";

import "./style.css";
import UserList from "../../../components/UserList";
import UserEdit from "../../../components/UserEdit";

const AdminUser = () => {
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

export default withAuth(AdminUser);
