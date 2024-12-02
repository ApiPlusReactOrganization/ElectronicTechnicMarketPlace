import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFavoriteProducts } from "../redux/actions";
import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 140,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const FavoriteProducts = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { favoriteProducts } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadFavoriteProducts());
  }, [dispatch]);

  return (
    <Grid2 container spacing={4}>
      {favoriteProducts && favoriteProducts.length > 0 ? (
        favoriteProducts.map((product) => (
          <Grid2 item xs={12} sm={6} md={3} key={product.id}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={product.image}
                title={product.name}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" component="p">
                  ${product.price}
                </Typography>
                <Button variant="contained" color="primary" className={classes.button}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary" align="center" fullWidth>
          You haven't added any products to your favorites yet.
        </Typography>
      )}
    </Grid2>
  );
};

export default FavoriteProducts;
