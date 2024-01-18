import React, { useState } from 'react';
import userModel from "../../models/userModel";
import { useNavigate } from "react-router-dom";

const AddMoneyToUser = () => {
  const [creditCard, setCreditCard] = useState('');
  const [money, setMoney] = useState('');
  const [isCreditCardValid, setIsCreditCardValid] = useState(true);
  const [isMoneyAmountValid, setIsMoneyAmountValid] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const addMoney = () => {
    if (creditCard.length < 12 || creditCard.length > 14) {
      setIsCreditCardValid(false);
      setSuccessMessage('You have to write a correct credit card.');
      return;
    }
    setIsCreditCardValid(true);

    if (!money || money <= 0) {
      setIsMoneyAmountValid(false);
      setSuccessMessage('You have to write a correct amount of money.');
      return;
    }

    console.log('Adding money to user...');
    setIsMoneyAmountValid(true);
    userModel.addMoney(localStorage.userId, money);
    setSuccessMessage('Successfully added money');
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
          Add money!
        </h1>

        <p className="rounded p-3 text-center text-sm md:text-base lg:text-lg text-gray-700 shadow bg-white mb-12">
          Fill in your credit card and the amount of money. Then press "add money".
        </p>

        <div className="flex flex-col mb-4">
          <label htmlFor="credit_card">Credit card:</label>
          <input
            className='rounded p-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
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
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="money_amount">Amount:</label>
          <input
            className='rounded p-3 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
            type="number"
            id="money_amount"
            name="money_amount"
            style={{ paddingLeft: '5px', border: isMoneyAmountValid ? '1px solid #e2e8f0' : '2px solid #ef4444' }}
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col items-center">
          {successMessage && (
            <div className={successMessage ? (isCreditCardValid && isMoneyAmountValid ? 'text-green-500' : 'text-red-500') : ''}>
              {successMessage}
            </div>
          )}
          <button className='bg-green-600 hover:bg-green-700 text-white font-bold mt-6 py-2 px-4 rounded-full' type="button" onClick={addMoney}>
            Add money
          </button>
        </div>
      </form>
  );
};

export default AddMoneyToUser;
