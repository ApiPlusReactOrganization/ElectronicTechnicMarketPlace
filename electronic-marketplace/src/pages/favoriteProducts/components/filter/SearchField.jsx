import React from 'react';
import { TextField } from '@mui/material';

const SearchField = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <TextField
        label="Search products..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ mb: 2, p: 1 }}
      />
    </div>
  );
};

export default SearchField;
