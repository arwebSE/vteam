import React, { useState } from 'react';
import userModel from "../../models/userModel";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const [userId] = localStorage.userId;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const updateUser = () => {
    try {
      userModel.editUser(userId, username, email, password);
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Failed to update user:", error);
      // todo: handle submit error?
    }
  };

  const handleBack = () => {
    navigate("/user/profile");
  };

  return (
      <form
      id="updateForm"
      action="/user"
      method="put"
      className="flex flex-col bg-gray-100 rounded-lg shadow-xl p-12"
      >
        <div className="flex justify-start mb-6">
          <button
              onClick={handleBack}
              className="cursor-pointer rounded bg-indigo-600 hover:bg-indigo-700 text-lg p-3 text-white shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center"
          >
            Back to Profile
          </button>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-600 mb-8 font-sans text-center">
          Edit profile!
        </h1>

        <p className="rounded p-3 text-center text-sm md:text-base lg:text-lg text-gray-700 shadow bg-white mb-12">
          Fill in the info that you want to edit and press 'Update User' when done
        </p>

        <div className="flex flex-col mb-4">
            <label htmlFor="username_edit" className="text-lg font-semibold mb-2">Username:</label>
            <input
                className="rounded p-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                type="text"
                id="username_edit"
                name="username_edit"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
        </div>

        <div className="flex flex-col mb-4">
            <label htmlFor="email_edit" className="text-lg font-semibold mb-2">Email:</label>
            <input
                className="rounded p-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                type="email"
                id="email_edit"
                name="email_edit"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>

        <div className="flex flex-col mb-4">
            <label htmlFor="passwd_edit" className="text-lg font-semibold mb-2">Password:</label>
            <input
                className="rounded p-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                type="password"
                id="passwd_edit"
                name="passwd_edit"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>

        <div className="flex justify-center">
          <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
              type="button"
              onClick={updateUser}
          >
              Update User
          </button>
        </div>
      </form>
  );
};

export default ProfileEdit;
