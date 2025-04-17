import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { HomePage } from './components/homePage';
import { HomePage1 } from './components/homePage1';
import { HomePage2 } from './components/homePage2';
import { HomePage3 } from './components/homePage3';
import { Loader } from './Interceptor/interceptor';
import LoginPage from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import RetrieveData from './components/RetrieveData';
import IngestionRepo from './components/IngesitonRepo';
import RedirectRoute from './RedirectRoute';
import ProtectRoute from './ProtectRoute';
import Register from './components/Register';
import GitMetrics from './components/GitMetrics';
import { TestCaseAi } from './components/TestCaseAi';
import { DeadCode } from './components/DeadCode';
import { GitReleaseNote } from './components/GitReleaseNote';
import { GitOperations } from './components/GitOperations';
import { KbmsOperations } from './components/KbmsOperations';

function App() {
  const isSpecialEnv = process.env.REACT_APP_AWS === "http://a48f8a29f2e4441469a8147c8de86d76-1360985584.ap-south-1.elb.amazonaws.com/";

  return (
    <Router>
      <Loader />
      {isSpecialEnv ? (
        <Routes>
          <Route path="/" element={<KbmsOperations />} />
        </Routes>
      ) : (
        <Routes>
          {/* Default route */}
          <Route path="/" element={<RedirectRoute><LoginPage /></RedirectRoute>} />

          {/* Protected routes */}
          <Route path="/homepage" element={<ProtectRoute><HomePage /></ProtectRoute>} />
          <Route path="/repoingestion" element={<ProtectRoute><IngestionRepo /></ProtectRoute>} />
          <Route path="/retrivingData" element={<ProtectRoute><RetrieveData /></ProtectRoute>} />
          <Route path="/document" element={<ProtectRoute><HomePage1 /></ProtectRoute>} />
          <Route path="/audio" element={<ProtectRoute><HomePage2 /></ProtectRoute>} />
          <Route path="/metrics" element={<ProtectRoute><HomePage3 /></ProtectRoute>} />
          <Route path="/admin" element={<ProtectRoute><AdminDashboard /></ProtectRoute>} />
          <Route path="/gitoprations" element={<ProtectRoute><GitOperations /></ProtectRoute>} />
          <Route path="/testcases" element={<ProtectRoute><TestCaseAi /></ProtectRoute>} />
          <Route path="/gitReleaseNote" element={<ProtectRoute><GitReleaseNote /></ProtectRoute>} />
          <Route path="/adminDashBoard" element={<ProtectRoute><AdminDashboard /></ProtectRoute>} />
          <Route path="/deadCode" element={<ProtectRoute><DeadCode /></ProtectRoute>} />
          <Route path="/gitmetrics" element={<ProtectRoute><KbmsOperations /></ProtectRoute>} />

          {/* Public route */}
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
