//('pk_test_51Q2zjOGGTPa0LSo8kWt4LDWRUoRFSxzGiA3CxRh5pczaKusOswitaJ7hXmPQrNMuVC6ihRamEFso81C3RvTKBPmJ00seqU2Qcc'); // Replace with your Stripe publishable key

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import useAuth from './userAuth';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q2zjOGGTPa0LSo8kWt4LDWRUoRFSxzGiA3CxRh5pczaKusOswitaJ7hXmPQrNMuVC6ihRamEFso81C3RvTKBPmJ00seqU2Qcc'); // Replace with your Stripe publishable key

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart }),
    });

    const session = await response.json();

    
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
    
      console.error(result.error.message);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>cart is empty please add something.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <img src={item.image} alt={item.name} width="100" />
              <p>Price: ${item.price}</p>
              <p>Quantity: 
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                />
              </p>
              <p>Total: ${item.price * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
            </div>
          ))}
          <h3>Total Cart Price: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
