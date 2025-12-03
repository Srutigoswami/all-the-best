import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BugList from './pages/BugList';
import BugDetails from './pages/BugDetails';
import ReportBug from './pages/ReportBug';
import Analytics from './pages/Analytics';
import AIPlayground from './pages/AIPlayground';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bugs" element={<BugList />} />
          <Route path="bugs/:id" element={<BugDetails />} />
          <Route path="report" element={<ReportBug />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ai" element={<AIPlayground />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
