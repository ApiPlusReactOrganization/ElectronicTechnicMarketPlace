import { Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useActions from "../../hooks/useActions";
import { useRenderCount } from "../../hooks/useRenderCount";
import CartItemCard from "./components/CartItemCard";

const MemoizedTypography = memo(Typography);

const CartItemsPage = () => {
  const cartItems = useSelector((state) => state.cartItem.cartItemList);
  const userId = useSelector((state) => state.user.currentUser?.id);
  const {
    getCartItemsByUserId,
    getCategories,
    filterProducts,
    getManufacturers,
  } = useActions();

const [filters, setFilters] = useState({
    manufacturerIds: [],
    name: '',
    minPrice: 0,
    maxPrice: 100000,
    minStockQuantity: 0,
    maxStockQuantity: 100000,
  })

  useEffect(() => {
    if (userId) {
      getCartItemsByUserId(userId);
      getCategories();
      filterProducts(filters);
      getManufacturers();
    }
  }, []);

  const renderCount = useRenderCount();

  return (
    <div className="container">
      <MemoizedTypography variant="h4" gutterBottom>
        Your Cart
      </MemoizedTypography>
      {cartItems.length > 0 ? (
        cartItems.map((item) => <CartItemCard cartItem={item} key={item.id} />)
      ) : (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty!
        </Typography>
      )}
      {/* <h5>render {renderCount}</h5> */}
    </div>
  );
};

export default CartItemsPage;
