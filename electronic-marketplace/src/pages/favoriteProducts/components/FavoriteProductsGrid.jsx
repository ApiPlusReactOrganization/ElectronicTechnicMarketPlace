import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import FavoriteProductCard from './FavoriteProductCard'

const FavoriteProductsGrid = React.memo(() => {
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts)

  const renderFavoriteProductCards = React.useCallback(() => {
    return favoriteProducts.map((product) => (
      <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
        <FavoriteProductCard product={product} />
      </Grid>
    ))
  }, [favoriteProducts])

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="stretch">
      {favoriteProducts && favoriteProducts.length > 0 ? (
        renderFavoriteProductCards()
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          You haven't added any products to your favorites yet.
        </Typography>
      )}
    </Grid>
  )
})

export default FavoriteProductsGrid
