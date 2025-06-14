import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Typography,
  Divider,
  Button,
  Box,
  Chip,
  Stack
} from '@mui/material';
import { Delete as DeleteIcon, Add, Remove } from '@mui/icons-material';

const Cart = ({ cartItems, addToCart, removeFromCart, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Seu Carrinho
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Seu carrinho está vazio</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <React.Fragment key={`${item.id}-${item.selectedSize || ''}`}>
                <ListItem>
                  <Box sx={{ mr: 2, width: 80, height: 80 }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }} 
                    />
                  </Box>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          Preço unitário: R$ {item.price.toFixed(2)}
                        </Typography>
                        {item.selectedSize && (
                          <Chip 
                            label={`Tamanho: ${item.selectedSize}`} 
                            size="small" 
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton 
                        size="small" 
                        onClick={() => removeFromCart(item.id, item.selectedSize, 1)}
                        color="secondary"
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      
                      <Typography variant="body1" sx={{ minWidth: 30, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      
                      <IconButton 
                        size="small" 
                        onClick={() => addToCart(item)}
                        color="primary"
                      >
                        <Add fontSize="small" />
                      </IconButton>
                      
                      <Typography variant="body1" sx={{ minWidth: 80, textAlign: 'right', mr: 2 }}>
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </Typography>
                      
                      <IconButton 
                        edge="end" 
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.quantity)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider sx={{ my: 1 }} />
              </React.Fragment>
            ))}
          </List>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 3,
            p: 2,
            backgroundColor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1
          }}>
            <Typography variant="h5">
              Total:
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              R$ {total.toFixed(2)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onCheckout}
              sx={{ minWidth: 200 }}
            >
              Finalizar Compra
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;