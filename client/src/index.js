import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import NavBar from './NavBar';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <NavBar />
      <Home />
  </React.StrictMode>
);

reportWebVitals();
