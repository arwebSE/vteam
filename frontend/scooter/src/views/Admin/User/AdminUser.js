import withAuth from "../../../util/withAuth";

import "./style.css";
import logo from "../../../logo.png";
import UserList from "../../../components/UserList";

function AdminUser() {

    return (
        <div>
            <div className="m-10 h-1.6 pt-16">
                <h1>Manage Users</h1>
                <UserList />
            </div>
        </div>
    );
}

export default AdminUser;