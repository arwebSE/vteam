import withAuth from "../../../util/withAuth";

import "./style.css";
import logo from "../../../logo.png";

function AdminUser() {
    const users = [
        { id: 1, name: "User One", email: "user1@example.com", role: "Admin" },
        { id: 2, name: "User Two", email: "user2@example.com", role: "User" },
    ];

    return (
        <div className="admin-user-container">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Manage Users
            </h1>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="edit-button">Edit</button>
                                <button className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-user-button">Add New User</button>
        </div>
    );
}

export default withAuth(AdminUser);
