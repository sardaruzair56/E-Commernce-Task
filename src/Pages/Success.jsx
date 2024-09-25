
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();


  setTimeout(() => {
    navigate('/shop'); 
  }, 3000);

  return (
    <div>
      <h1>Transaction Successful!</h1>
      <p>Your payment has been processed successfully. You will be redirected to the shop page shortly.</p>
    </div>
  );
};

export default Success;
