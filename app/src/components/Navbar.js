import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CreateGroup from './CreateGroup';

const Navbar = () => {
  const [isCreateGroupVisible, setIsCreateGroupVisible] = useState(false);

  const openCreateGroup = () => {
    setIsCreateGroupVisible(true);
  };

  const closeCreateGroup = () => {
    setIsCreateGroupVisible(false);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="text-white flex justify-center items-center space-x-4">
        <li>
          <a href="/">
            RIO
          </a>
        </li>
        <li>
          <button
            onClick={openCreateGroup}
            className="text-white font-semibold hover:text-blue-300"
          >
            Create
          </button>
        </li>
        <li>
          <a href="/dashboard" className="text-white font-semibold hover:text-blue-300">Dashboard</a>
        </li>
      </ul>

      {isCreateGroupVisible && ReactDOM.createPortal(
        <CreateGroup isOpen={isCreateGroupVisible} onClose={closeCreateGroup} onSubmit={(formData) => console.log(formData)} />,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
