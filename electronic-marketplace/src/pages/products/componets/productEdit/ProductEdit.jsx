import React, { useEffect, useState, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useActions from "../../../../hooks/useActions";
import ProductImages from "./ProductImages";
import ProductEditForm from "./ProductEditForm";

const ProductsEdit = () => {
  const { getProductById } = useActions();
  const { productId } = useParams();
  const product = useSelector((state) => state.product.productForEdit);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getProductById(productId);
        if (!result.success) {
          toast.error(result.message || "Failed to load product");
        }
      } catch (error) {
        toast.error("An error occurred while loading the product");
      }
    };

    fetchProduct();
  }, []);

  if (!product)
    return;

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center gap-3">
        <h1 className="m-0">Edit Product: {product.name}</h1>
        <ProductImages />
        <ProductEditForm />
      </div>
    </div>
  );
};

export default memo(ProductsEdit);
