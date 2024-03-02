// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // Adjust the import path as necessary
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import HistoryPage from './pages/HistoryPage';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
