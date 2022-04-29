import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './views/Home/home';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

//Implemented routes so that in the future new pages can be added.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </BrowserRouter>  
  </React.StrictMode>
);

reportWebVitals();
