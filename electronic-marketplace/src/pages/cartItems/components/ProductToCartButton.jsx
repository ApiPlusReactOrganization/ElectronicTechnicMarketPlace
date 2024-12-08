import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Для навігації
import { toast } from 'react-toastify';
import useActions from '../../../hooks/useActions';
import { IconButton } from '@mui/material';

const ProductToCartButton = ({ productId }) => {
  const [isInCart, setIsInCart] = useState(false);

  const cartItems = useSelector((state) => state.cartItem.cartItemList);
  const userId = useSelector((state) => state.user.userId);
  const { createCartItem } = useActions();
  const navigate = useNavigate();

  // Використовуємо useEffect для оновлення статусу після завантаження cartItems
  useEffect(() => {
    if (cartItems && userId) {
      const isProductInCart = cartItems.some(
        (item) => item.productId === productId && item.userId === userId
      );
      setIsInCart(isProductInCart);
    }
  }, [cartItems]);

  const handleAddToCart = () => {
    if (isInCart) {
      // Якщо товар вже є в кошику, перенаправляємо на сторінку кошика
      navigate('/cartItems');
    } else {
      const cartItem = {
        productId,
        userId,
        quantity: 1,
      };

      createCartItem(cartItem).then((response) => {
        if (response.success) {
          toast.success('Product added to cart!');
          setIsInCart(true); // Оновлюємо статус на "в кошику"
        } else {
          toast.error(response.message);
        }
      });
    }
  };

  return (
    <div>
      <IconButton onClick={handleAddToCart}>
        {isInCart ? (
          <FaCheckCircle size={24} color="green" title="In Cart" />
        ) : (
          <FaShoppingCart size={24} color="gray" title="Add to Cart" />
        )}
      </IconButton>
    </div>
  );
};

export default ProductToCartButton;
