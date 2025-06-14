import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ButtonGroup sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
      <Button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'contained' : 'outlined'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próxima
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;