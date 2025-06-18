import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 import { HomePage3 } from './components/homePage3';
import { Loader } from './Interceptor/interceptor';
import LoginPage from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import RetrieveData from './components/RetrieveData';
import IngestionRepo from './components/IngesitonRepo';
import RedirectRoute from './RedirectRoute';
import ProtectRoute from './ProtectRoute';
import { TestCaseAi } from './components/TestCaseAi';
import { DeadCode } from './components/DeadCode';
import { GitReleaseNote } from './components/GitReleaseNote';
import { GitOperations } from './components/GitOperations';
import Register from './components/Register';
function App() { 
  return (
    <Router>
      <Loader />
        <Routes>
          <Route path="/" element={<RedirectRoute><LoginPage /></RedirectRoute>} />
          <Route path="/repoingestion" element={<ProtectRoute><IngestionRepo /></ProtectRoute>} />
          <Route path="/retrivingData" element={<ProtectRoute><RetrieveData /></ProtectRoute>} />
          <Route path="/metrics" element={<ProtectRoute><HomePage3 /></ProtectRoute>} />
          <Route path="/admin" element={<ProtectRoute><AdminDashboard /></ProtectRoute>} />
          <Route path="/gitoprations" element={<ProtectRoute><GitOperations /></ProtectRoute>} />
          <Route path="/testcases" element={<ProtectRoute><TestCaseAi /></ProtectRoute>} />
          <Route path="/gitReleaseNote" element={<ProtectRoute><GitReleaseNote /></ProtectRoute>} />
          <Route path="/adminDashBoard" element={<ProtectRoute><AdminDashboard /></ProtectRoute>} />
          <Route path="/deadCode" element={<ProtectRoute><DeadCode /></ProtectRoute>} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
  );
}
 
export default App;