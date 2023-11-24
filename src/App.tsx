import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Search from './components/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Search /> } />
    </Routes>

  );
}

export default App;
