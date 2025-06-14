import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Chip, 
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert
} from '@mui/material';

const ProductCard = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Selecione um tamanho antes de comprar');
      return;
    }
    setError('');
    onAddToCart({ ...product, selectedSize });
  };

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 3
      }
    }}>
      <CardMedia
        component="img"
        sx={{ 
          height: 250,
          objectFit: 'contain', 
          backgroundColor: '#f5f5f5', 
          p: 1 
        }}
        image={product.image}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          mb: 1
        }}>
          {product.description}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          R$ {product.price.toFixed(2)}
        </Typography>
        
        <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
          <InputLabel>Tamanho</InputLabel>
          <Select
            value={selectedSize}
            label="Tamanho"
            onChange={(e) => setSelectedSize(e.target.value)}
            size="small"
          >
            {product.sizes?.map(size => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {error && (
          <Box sx={{ mt: 1 }}>
            <Alert severity="error" sx={{ py: 0 }}>{error}</Alert>
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button
          size="small"
          component={Link}
          to={`/product/${product.id}`}
          sx={{ textTransform: 'none' }}
        >
          Detalhes
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={handleAddToCart}
          sx={{ textTransform: 'none' }}
          disabled={!selectedSize}
        >
          Comprar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;