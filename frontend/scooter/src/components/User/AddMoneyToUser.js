import React, { useState } from 'react';
//import userModel from "../../models/userModel";

const AddMoneyToUser = () => {
  //const [userId] = localStorage.userId;
  const [creditCard, setCreditCard] = useState('');
  const [money, setMoney] = useState('');

  const addMoney = () => {
    //userModel.editUser(userId, money);
    console.log('Adding money to user...');
  };

  return (
    <div className='w-5/6 p-3 flex flex-col items-center bg-stone-100 text-base'>
      <form id="updateForm" action="/user" method="put">
        <label htmlFor="credit_card">Credit card:</label>
        <input className='block h-6 text-sm font-medium text-gray-900'
          type="tel"
          id="credit_card"
          name="credit_card"
          placeholder="xxxx xxxx xxxx"
          style={{ paddingLeft: '5px' }}
          value={creditCard}
          onChange={(e) => setCreditCard(e.target.value)}
          required
        />
        <br />
        <label htmlFor="money_amount">Amount:</label>
        <input className='block h-6 text-sm font-medium text-gray-900'
          type="number"
          id="money_amount"
          name="money_amount"
          style={{ paddingLeft: '5px' }}
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          required
        />
        <br />
        <button className='bg-green-600 hover:bg-green-700 text-white font-bold ml-6 py-2 px-4 rounded-full' type="button" onClick={addMoney}>
          Add money
        </button>
      </form>
    </div>
  );
};

export default AddMoneyToUser;
