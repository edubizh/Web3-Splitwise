import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div>
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
