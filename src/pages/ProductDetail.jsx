import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Card, CardMedia, CardContent, Grid, Stack, Chip, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import api from '../services/api';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.getProductById(id);
        setProduct(response.data);
        setLoading(false);
        if (response.data.sizes) {
          setSelectedSize(response.data.sizes[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        navigate('/');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    const productWithSize = { ...product, selectedSize };
    addToCart(productWithSize);
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (!product) {
    return <Typography>Produto não encontrado</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Voltar
      </Button>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              sx={{ 
                height: '500px',
                objectFit: 'contain'
              }}
              image={product.image}
              alt={product.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              R$ {product.price.toFixed(2)}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Categoria: {product.category}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Avaliação: {product.rating}/5.0
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Estoque disponível: {product.stock} unidades
            </Typography>
            
            {product.sizes && (
              <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                <InputLabel>Tamanho</InputLabel>
                <Select
                  value={selectedSize}
                  label="Tamanho"
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {product.sizes.map(size => (
                    <MenuItem key={size} value={size}>{size}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            
            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAddToCart}
              sx={{ mt: 2 }}
            >
              Adicionar ao Carrinho
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;