import React, { useState } from 'react';
import userModel from "../../models/userModel";

const ProfileEdit = () => {
  const [userId] = localStorage.userId;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateUser = () => {
    userModel.editUser(userId, username, email, password);
    console.log('Updating user...');
  };

  return (
    <div className='w-5/6 p-3 flex flex-col items-center bg-stone-100 text-base'>
      <form id="updateForm" action="/user" method="put">
        <label htmlFor="username_edit">Username:</label>
        <input className='block h-6 text-sm font-medium text-gray-900'
          type="text"
          id="username_edit"
          name="username_edit"
          style={{ paddingLeft: '5px' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="email_edit">Email:</label>
        <input className='block h-6 text-sm font-medium text-gray-900'
          type="email"
          id="email_edit"
          name="email_edit"
          style={{ paddingLeft: '5px' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="passwd_edit">Password:</label>
        <input className='block h-6 text-sm font-medium text-gray-900'
          type="password"
          id="passwd_edit"
          name="passwd_edit"
          style={{ paddingLeft: '5px' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold ml-6 py-2 px-4 rounded-full' type="button" onClick={updateUser}>
          Update User
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
