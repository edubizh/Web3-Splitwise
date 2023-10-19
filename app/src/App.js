import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div>
        < Navbar />
        <Routes>
          <Route path="/" element={< Landing />} />
          <Route path="/dashboard" element={< Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
