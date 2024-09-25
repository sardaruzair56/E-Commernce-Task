// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { CartProvider } from './Context/CartContext';  

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <Router>
      <App />
    </Router>
  </CartProvider>
);
