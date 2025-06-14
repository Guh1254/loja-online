import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';

const Header = ({ cartItems }) => {
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Guh'z Store
          </Link>
        </Typography>
        <IconButton color="inherit" component={Link} to="/checkout">
          <Badge badgeContent={itemCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;