import React, { useState } from 'react';

const CreateGroup = ({ isOpen, onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [walletIds, setWalletIds] = useState(['']);
  const [expenses, setExpenses] = useState([
    { description: '', amount: 0, currency: 'ETH' },
  ]);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleWalletIdChange = (e, index) => {
    const updatedWalletIds = [...walletIds];
    updatedWalletIds[index] = e.target.value;
    setWalletIds(updatedWalletIds);
  };

  const handleExpenseChange = (e, expenseIndex, field) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[expenseIndex][field] = e.target.value;
    setExpenses(updatedExpenses);
  };

  const addWalletIdField = () => {
    setWalletIds([...walletIds, '']);
  };

  const removeWalletIdField = (index) => {
    const updatedWalletIds = [...walletIds];
    updatedWalletIds.splice(index, 1);
    setWalletIds(updatedWalletIds);
  };

  const addExpense = () => {
    const newExpense = {
      description: '',
      amount: 0,
      currency: 'ETH',
    };
    setExpenses([...expenses, newExpense]);
  };

  const removeExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const handleSubmit = () => {
    const formData = {
      groupName,
      description,
      walletIds,
      expenses,
    };
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-128 max-h-screen overflow-y-auto"> {/* Increased width to 128 */}
        <h2 className="text-2xl font-semibold mb-4">Create Group</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name:</label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={groupName}
              onChange={handleGroupNameChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Wallet IDs:</label>
            {walletIds.map((walletId, index) => (
              <div key={index} className="flex space-x-2 items-center mb-2">
                <input
                  type="text"
                  name="walletId"
                  value={walletId}
                  onChange={(e) => handleWalletIdChange(e, index)}
                  className="p-2 flex-grow rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeWalletIdField(index)}
                  className="px-3 py-1 text-red-500 rounded-md hover:text-red-700"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addWalletIdField}
              className="px-3 py-1 text-blue-500 hover:underline"
            >
              +
            </button>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Expenses:</h3>
            {expenses.map((expense, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  name="description"
                  value={expense.description}
                  onChange={(e) => handleExpenseChange(e, index, 'description')}
                  placeholder="Expense description"
                  className="p-2 w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <input
                  type="number"
                  name="amount"
                  value={expense.amount}
                  onChange={(e) => handleExpenseChange(e, index, 'amount')}
                  placeholder="Amount"
                  className="p-2 w-full mt-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <select
                  name="currency"
                  value={expense.currency}
                  onChange={(e) => handleExpenseChange(e, index, 'currency')}
                  className="p-2 w-full mt-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeExpense(index)}
                  className="mt-2 px-3 py-1 text-red-500 rounded-md hover:text-red-700"
                >
                  Remove Expense
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addExpense}
              className="px-3 py-1 text-blue-500 hover:underline"
            >
              + Add Expense
            </button>
          </div>
          <div className="text-right">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </form>
        <button
          type="button"
          className="text-sm text-gray-500 mt-4 hover:underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
