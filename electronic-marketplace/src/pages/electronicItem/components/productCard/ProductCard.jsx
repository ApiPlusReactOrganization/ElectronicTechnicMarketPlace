import React from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import useActions from '../../../../hooks/useActions';
import defaultImage from '../../../../assets/images/noImageProduct.png';
import productImage from '../../../../hooks/productImage';
import { useSelector } from 'react-redux';

const ProductCard = ({ product }) => {
  const { addProductToFavorites, removeProductFromFavorites } = useActions();
  const userId = useSelector((state) => state.user.userId);
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts);

  const isFavorite = favoriteProducts.includes(product.id); // перевірка, чи продукт улюблений

  const imageUrl =
    product.images && product.images.length > 0
      ? productImage(product.images[0].filePath)
      : defaultImage;

  // Обробник зміни стану іконки (додавання/видалення з улюблених)
  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      // Якщо продукт уже улюблений, то його видалити
      await removeProductFromFavorites(userId, product.id);
      toast.info('Product removed from favorites!');
    } else {
      // Якщо продукт не улюблений, то додати
      await addProductToFavorites(userId, product.id);
      toast.success('Product added to favorites!');
    }
  };

  return (
    <div className="card mb-3" style={{ maxWidth: '18rem' }}>
      <div className="card-body text-center">
        <img
          src={imageUrl}
          alt={product.name}
          className="card-img-top"
          style={{ width: '100%', height: 'auto' }}
        />
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-truncate">{product.description}</p>
        <p className="card-text">Price: ${product.price}</p>

        {/* Обмеження зміни іконки */}
        <IconButton onClick={handleFavoriteToggle} disabled={isFavorite && false}>
          {isFavorite ? (
            <Favorite color="error" /> // Заповнена іконка - для видалення з улюблених
          ) : (
            <FavoriteBorder /> // Порожня іконка - для додавання в улюблені
          )}
        </IconButton>

        <button
          className="btn btn-primary"
          onClick={() => navigate(`/electronicItem/product/${product.id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
