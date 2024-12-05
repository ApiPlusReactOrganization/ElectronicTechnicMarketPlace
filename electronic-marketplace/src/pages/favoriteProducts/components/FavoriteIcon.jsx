import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
import { toast } from 'react-toastify';

const FavoriteIcon = ({ productId }) => {
  const { removeProductFromFavorites, addProductToFavorites } = useActions();
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts);
  const userId = useSelector((state) => state.user.userId);

  const handleFavoriteToggle = () => {
    if (favoriteProducts.some((fav) => fav.id === productId)) {
      removeProductFromFavorites(userId, productId);
      toast.success('Product removed from favorites!');
    } else {
      addProductToFavorites(userId, productId);
      toast.success('Product added to favorites!');
    }
  };

  return (
    <IconButton onClick={handleFavoriteToggle}>
      {favoriteProducts.some((fav) => fav.id === productId) ? (
        <Favorite color="error" />
      ) : (
        <FavoriteBorder />
      )}
    </IconButton>
  );
};

export default FavoriteIcon;
