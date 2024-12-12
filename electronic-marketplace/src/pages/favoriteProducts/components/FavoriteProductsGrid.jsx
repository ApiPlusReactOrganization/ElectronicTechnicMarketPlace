import React from 'react';
import { Grid, Typography } from '@mui/material';
import FavoriteProductCard from './FavoriteProductCard';

const FavoriteProductsGrid = React.memo(({ favoriteProducts }) => {
  const renderFavoriteProductCards = () => {
    return favoriteProducts.map((product) => (
      <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
        <FavoriteProductCard product={product} />
      </Grid>
    ));
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="stretch">
      {favoriteProducts && favoriteProducts.length > 0 ? (
        renderFavoriteProductCards()
      ) : (
        <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 4 }}>
          No products found.
        </Typography>
      )}
    </Grid>
  );
});

export default FavoriteProductsGrid;
