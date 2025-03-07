import React from 'react';
import './App.css';
import { HomePage } from './components/homePage';
import { HomePage1 } from './components/homePage1';
import { HomePage2 } from './components/homePage2';
import { HomePage3 } from './components/homePage3';
import { Loader } from './Interceptor/interceptor';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import RetrieveData from './components/RetrieveData';
import IngestionRepo from './components/IngesitonRepo';
import RedirectRoute from './RedirectRoute';
import ProtectRoute from './ProtectRoute';
import Register from './components/Register';
import GitMetrics from './components/GitMetrics';
import { TestCaseAi } from './components/TestCaseAi';
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
          path="/homepage"
          element={
            <ProtectRoute>
              <HomePage />
            </ProtectRoute>
          }
        />
        <Route
          path="/repoingestion"
          element={
            <ProtectRoute>
              <IngestionRepo />
            </ProtectRoute>
          }
        />
        <Route
          path="/retrivingData"
          element={
            <ProtectRoute>
              <RetrieveData />
            </ProtectRoute>
          }
        />
        <Route
          path="/document"
          element={
            <ProtectRoute>
              <HomePage1 />
            </ProtectRoute>
          }
        />
        <Route
          path="/audio"
          element={
            <ProtectRoute>
              <HomePage2 />
            </ProtectRoute>
          }
        />
        <Route
          path="/metrics"
          element={
            <ProtectRoute>
              <HomePage3 />
            </ProtectRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectRoute>
              <AdminDashboard />
            </ProtectRoute>
          }
        />
         <Route
          path="/gitmetrics"
          element={
            <ProtectRoute>
              <GitMetrics/>
            </ProtectRoute>
          }
        />
         <Route
          path="/testcases"
          element={
            <ProtectRoute>
              <TestCaseAi/>
            </ProtectRoute>
          }
        />
        <Route
          path="/register"
          element={
            <Register />
          }
        />
        <Route
          path="/adminDashBoard"
          element={
            <ProtectRoute>
              <AdminDashboard />
            </ProtectRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;