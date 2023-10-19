import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-center items-center space-x-4">
        <li>
          <a href="/" className="text-white font-semibold hover:text-blue-300">Create</a>
        </li>
        <li>
          <a href="/dashboard" className="text-white font-semibold hover:text-blue-300">Dashboard</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
