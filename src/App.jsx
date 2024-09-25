// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import Login from './Pages/Login';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Logout from './Pages/Logout';

function App() {
  return (
    <CartProvider>
      <div>
        <nav>
          <Link to="/login">Login</Link> | 
          <Link to="/shop">Shop</Link> | 
          <Link to="/cart">Cart</Link> | 
          <Link to="/logout">Logout</Link>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
