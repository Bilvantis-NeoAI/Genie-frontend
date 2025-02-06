import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import RedirectRoute from './RedirectRoute';
import Register from './components/Register';
import ProtectRoute from './ProtectRoute';
import MetricTabs from './components/MetricsTab';
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/genie"
          element={
            <LoginPage />
          }
        />
        <Route path="/genie" element={<RedirectRoute><LoginPage /></RedirectRoute>} />
        <Route
          path="/genie/register"
          element={
            <Register />
          }
        />
        <Route
          path="/genie/metrics"
          element={
            <ProtectRoute>
            <MetricTabs /></ProtectRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;