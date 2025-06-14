import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export default {
  getProducts: (page = 1, limit = 6) => api.get(`/products?_page=${page}&_limit=${limit}`),
  getProductById: (id) => api.get(`/products/${id}`),
  getTotalProducts: () => api.get('/products')
};