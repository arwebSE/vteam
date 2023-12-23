import React, { useState } from 'react';
import userModel from "../../models/userModel";

const AddMoneyToUser = () => {
  const [userId] = localStorage.userId;
  const [creditCard, setCreditCard] = useState('');
  const [money, setMoney] = useState('');
  const [isCreditCardValid, setIsCreditCardValid] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  const addMoney = () => {
    if (creditCard.length < 12 || creditCard.length > 14) {
      console.log("You have to write a correct credit card.");
      setIsCreditCardValid(false);
      setSuccessMessage('You have to write a correct credit card.');
      return;
    }

    console.log('Adding money to user...');
    setIsCreditCardValid(true);
    userModel.addMoney(userId, money);
    setSuccessMessage('Successfully added money');
  };

  return (
    <div className='w-5/6 p-3 flex flex-col items-center bg-stone-100 text-base'>
      <form id="updateForm" action="/user" method="put">
        <label htmlFor="credit_card">Credit card:</label>
        <input
          className={`block h-6 text-sm font-medium text-gray-900`}
          type="tel"
          id="credit_card"
          name="credit_card"
          placeholder="xxxx xxxx xxxx"
          inputMode="numeric"
          pattern="[0-9\s]{12,14}"
          maxLength="14"
          minLength="12"
          style={{ paddingLeft: '5px', border: isCreditCardValid ? '1px solid #e2e8f0' : '2px solid #ef4444' }}
          value={creditCard}
          onChange={(e) => setCreditCard(e.target.value)}
          required
        />
        <br />
        <label htmlFor="money_amount">Amount:</label>
        <input
          className='block h-6 text-sm font-medium text-gray-900'
          type="number"
          id="money_amount"
          name="money_amount"
          style={{ paddingLeft: '5px', border: '1px solid #e2e8f0' }}
          value={money}
          onChange={(e) => setMoney(e.target.value)}
          required
        />
        <br />
        <button className='bg-green-600 hover:bg-green-700 text-white font-bold ml-6 py-2 px-4 rounded-full' type="button" onClick={addMoney}>
          Add money
        </button>
        {successMessage && (
          <div className={successMessage ? (isCreditCardValid ? 'text-green-500' : 'text-red-500') : ''}>
            {successMessage}
          </div>        
        )}
      </form>
    </div>
  );
};

export default AddMoneyToUser;
