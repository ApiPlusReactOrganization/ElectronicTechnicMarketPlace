import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material'
import { styled } from '@mui/system'
import useActions from '../../hooks/useActions'
import productImage from '../../hooks/productImage'

const CardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
}))

const Media = styled(CardMedia)({
  height: 140,
})

const FavoriteProducts = () => {
  const { loadFavoriteProducts } = useActions()
  const { userId } = useSelector((state) => state.user)
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts)

  useEffect(() => {
    if (userId) {
      loadFavoriteProducts(userId)
    }
  }, [])

  return (
    <Grid container spacing={4}>
      {favoriteProducts && favoriteProducts.length > 0 ? (
        favoriteProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <CardContainer>
              <Media
                image={productImage(product?.images[0]?.filePath)}
                title={product.name}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
                <Button variant="contained" color="primary">
                  Add to Cart
                </Button>
              </CardContent>
            </CardContainer>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          You haven't added any products to your favorites yet.
        </Typography>
      )}
    </Grid>
  )
}

export default FavoriteProducts
