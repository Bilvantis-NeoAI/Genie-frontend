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
import ProtectRoute from "./ProtectRoutes";
import RedirectRoute from "./RedirectRoute";
import Register from './components/Register';


// function App() {
//   return (
//     <Router>
//       <Loader />
//       <Routes>
//         <Route path='/' element={<LoginPage />} />
//         <Route path='/homepage' element={<HomePage />} />
//         <Route path='/document' element={<HomePage1 />} />
//         <Route path='/audio' element={<HomePage2 />} />
//         <Route path='/metrics' element={<HomePage3 />} />
//         <Route path='/admin' element={<AdminDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

function App() {
  return (
    <Router>
      <Loader />
      <Routes>
        <Route
          path="/"
          element={
            <RedirectRoute>
              <LoginPage />
            </RedirectRoute>
          }
        />
        <Route
          path="/homepage"
          element={
            <ProtectRoute>
              <HomePage />
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
          path="/register"
          element={
            <Register />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
