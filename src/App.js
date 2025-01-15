import React from 'react';
import './App.css';
import { Loader } from './interceptor/interceptor';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import RedirectRoute from './RedirectRoute';
import Register from './components/Register';
import ProtectRoute from './ProtectRoute';
import MetricTabs from './components/MetricsTab';
function App() {
  return (
    <Router>
      <Loader />
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage />
          }
        />
        <Route path="/" element={<RedirectRoute><LoginPage /></RedirectRoute>} />
        <Route
          path="/register"
          element={
            <Register />
          }
        />
        <Route
          path="/metrics"
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