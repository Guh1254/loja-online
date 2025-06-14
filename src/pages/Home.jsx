import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import api from '../services/api';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await api.getProducts(currentPage, limit);
        setProducts(productsResponse.data);
        
        const totalResponse = await api.getTotalProducts();
        const totalProducts = totalResponse.data.length;
        setTotalPages(Math.ceil(totalProducts / limit));
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Produtos em Destaque
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} onAddToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;