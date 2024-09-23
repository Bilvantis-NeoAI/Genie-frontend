import React from 'react';
import './App.css';
import { HomePage } from './components/homePage';
import { HomePage1 } from './components/homePage1';
import { HomePage2 } from './components/homePage2';
import { HomePage3 } from './components/homePage3';
import { Loader } from './Interceptor/interceptor';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
    <Loader></Loader>
<Routes>
<Route path='/' element={<HomePage />} />
<Route path='/LocalLLMQ&A' element={<HomePage1 />} />
<Route path='/ConversationalQ&A' element={<HomePage2 />} />
<Route path='/home3' element={<HomePage3 />} />
</Routes>
    </Router>
  );
}

export default App;
