import withAuth from "../../../util/withAuth";

import "./style.css";
import logo from "../../../logo.png";
import UserList from "../../../components/UserList";

function AdminUser() {
    const users = [
        { id: 1, name: "User One", email: "user1@example.com", role: "Admin" },
        { id: 2, name: "User Two", email: "user2@example.com", role: "User" },
    ];

    return (
        <div>
            <div className="m-10 h-1.6 pt-16">
                <h1>Manage Users</h1>
                <UserList />
            </div>
        </div>
    );
}

export default withAuth(AdminUser);
