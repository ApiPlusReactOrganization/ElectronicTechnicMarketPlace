import React from 'react'
import { Grid, Typography } from '@mui/material'
import FavoriteProductCard from './FavoriteProductCard'

const FavoriteProductsGrid = React.memo(({ favoriteProducts }) => {
  return (
    <Grid container spacing={3}>
      {favoriteProducts.length > 0 ? (
        favoriteProducts.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <FavoriteProductCard product={product} />
          </Grid>
        ))
      ) : (
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          sx={{ mt: 4 , ml : 40}}
        >
          No products found.
        </Typography>
      )}
    </Grid>
  )
})

export default FavoriteProductsGrid
