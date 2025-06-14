import React from 'react';
import { Button, Typography, Paper } from '@mui/material';
import Cart from '../components/Cart';

const Checkout = ({ 
  cartItems, 
  addToCart,
  removeFromCart, 
  clearCart 
}) => {
  const handleCheckout = () => {
    alert('Compra finalizada com sucesso!');
    clearCart();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Finalizar Compra
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Cart 
          cartItems={cartItems} 
          addToCart={addToCart}
          removeFromCart={removeFromCart} 
          onCheckout={handleCheckout}
        />
      </Paper>
    </div>
  );
};

export default Checkout;