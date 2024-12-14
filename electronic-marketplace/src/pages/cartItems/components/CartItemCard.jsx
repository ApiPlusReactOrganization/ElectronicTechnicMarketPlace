import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import React, { memo, useCallback, useState } from "react";
import { toast } from "react-toastify";
import useActions from "../../../hooks/useActions";
import ProductImage from "../../products/components/productCards/components/ProductImage";
import { useRenderCount } from "../../../hooks/useRenderCount";
import DeleteCartItemModal from "../cartItemsModals/DeleteCartItemModal";
import { useNavigate } from "react-router-dom";

const CartItemCard = ({ cartItem }) => {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const openDeleteModal = useCallback((id) => {
    setSelectedProductId(id);
    setShowDeleteModal(true);
  }, []);

  const closeDeleteModal = useCallback(() => setShowDeleteModal(false), []);

  const { updateCartItem } = useActions();

  const handleQuantityChange = async (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      const result = await updateCartItem(item.id, newQuantity);

      if (!result.success) {
        toast.error(`Error: ${result.message}`);
      }
    }
  };

  const renderCount = useRenderCount();

  return (
    <div>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          marginBottom: 2,
          boxShadow: 3,
        }}
      >
        <ProductImage images={cartItem.product.images} />

        {/* Інформація про товар */}
        <CardContent sx={{ flex: "1 1 auto" }}>
          <Typography variant="h6" component="div">
            <Link
              component="button"
              onClick={() => {
                navigate(`/electronicItem/product/${cartItem.product.id}`);
              }}
            >
              {cartItem.product.name}
            </Link>
          </Typography>
          <Typography color="text.secondary">
            Продавець: {cartItem.product.manufacturer.name || "Unknown"}
          </Typography>
          <Typography color="text.secondary">
            Категорія: {cartItem.product.category.name || "Unknown"}
          </Typography>
        </CardContent>

        {/* Кількість товару */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => handleQuantityChange(cartItem, -1)}
            size="small"
          >
            <RemoveIcon />
          </IconButton>
          <TextField
            value={cartItem.quantity}
            size="small"
            sx={{ width: 50, textAlign: "center", mx: 1 }}
            inputProps={{ readOnly: true }}
          />
          <IconButton
            onClick={() => handleQuantityChange(cartItem, 1)}
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* Ціна товару */}
        <Typography
          variant="h6"
          sx={{ color: "red", marginLeft: 2, minWidth: 80 }}
        >
          {cartItem.product.price} $
        </Typography>

        {/* Видалення товару */}
        <IconButton onClick={() => openDeleteModal(cartItem.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </Card>
      {/* <h5>renderCount: {renderCount}</h5> */}

      <DeleteCartItemModal
        showModal={showDeleteModal}
        closeModal={closeDeleteModal}
        cartItemId={selectedProductId}
      />
    </div>
  );
};

export default memo(CartItemCard);
