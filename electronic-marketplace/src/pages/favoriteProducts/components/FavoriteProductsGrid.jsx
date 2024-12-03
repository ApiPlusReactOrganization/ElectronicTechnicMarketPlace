import {
  Grid2,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import productImage from '../../../hooks/productImage';
import { useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
import { toast } from 'react-toastify';

const FavoriteProductsGrid = () => {
  const { removeProductFromFavorites } = useActions();
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts);
  const userId = useSelector((state) => state.user.userId);

  const handleFavoriteToggle = (productId) => {
    removeProductFromFavorites(userId, productId);
    toast.success('Product removed from favorites!');
  };

  return (
    <Grid2 container spacing={4}>
      {favoriteProducts && favoriteProducts.length > 0 ? (
        favoriteProducts.map((product) => (
          <Grid2 key={product.id} xs={12} sm={6} md={3}>
            <CardWrapper>
              <FavoriteIconWrapper
                onClick={() => handleFavoriteToggle(product.id)}
              >
                {favoriteProducts.some((fav) => fav.id === product.id) ? (
                  <Favorite color="error" />
                ) : (
                  <FavoriteBorder />
                )}
              </FavoriteIconWrapper>
              <Media
                image={productImage(product?.images[0]?.filePath)}
                title={product.name}
              />
              <ContentWrapper>
                <TruncatedTypography variant="h6" component="h2">
                  {product.name}
                </TruncatedTypography>
                <TruncatedTypography variant="body2" color="textSecondary">
                  {product.description}
                </TruncatedTypography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
              </ContentWrapper>
              <Button variant="contained" color="primary">
                Add to Cart
              </Button>
            </CardWrapper>
          </Grid2>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          You haven't added any products to your favorites yet.
        </Typography>
      )}
    </Grid2>
  );
};

export default FavoriteProductsGrid;

const CardWrapper = styled(Card)(({ theme }) => ({
  width: 250,
  height: 350,
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
}));

const Media = styled(CardMedia)({
  height: 140,
});

const ContentWrapper = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const TruncatedTypography = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

const FavoriteIconWrapper = styled(IconButton)({
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 2,
});
