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
import Kb from './components/Kb';
import RetriveData from './components/RetriveData';
function App() {
  return (
    <Router>
      <Loader></Loader>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/document' element={<HomePage1 />} />
        <Route path='/audio' element={<HomePage2 />} />
        <Route path='/metrics' element={<HomePage3 />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/repoingestion' element ={<Kb/>}/>
        <Route path ='/retrivingData' element ={<RetriveData/>}/>
      </Routes>
    </Router>
  );
}

export default App;
