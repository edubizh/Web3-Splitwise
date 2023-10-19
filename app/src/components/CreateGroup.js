import React, { useState } from 'react';

const CreateGroup = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    groupName: '',
    description: '',
    walletIds: [''],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedWalletIds = [...formData.walletIds];
    if (index !== -1) {
      updatedWalletIds[index] = value;
    } else {
      formData[name] = value; // Corrected the name assignment for group name and description
    }

    setFormData({ ...formData, walletIds: updatedWalletIds });
  };

  const addWalletIdField = () => {
    setFormData({ ...formData, walletIds: [...formData.walletIds, ''] });
  };

  const removeWalletIdField = (index) => {
    const updatedWalletIds = [...formData.walletIds];
    updatedWalletIds.splice(index, 1);
    setFormData({ ...formData, walletIds: updatedWalletIds });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Create Group</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name:</label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={formData.groupName}
              onChange={(e) => handleChange(e, -1)}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e, -1)}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Wallet IDs:</label>
            {formData.walletIds.map((walletId, index) => (
              <div key={index} className="flex space-x-2 items-center mb-2">
                <input
                  type="text"
                  name="walletId"
                  value={walletId}
                  onChange={(e) => handleChange(e, index)}
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
