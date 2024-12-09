import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useActions from "../../../../hooks/useActions";
import ProductEditForm from "./ProductEditForm";
import ProductImages from "./ProductImages";

const ProductsEdit = () => {
  const { getProductById } = useActions();
  const { productId } = useParams();

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

  const product = useSelector((state) => state.product.productForEdit);

  return (
    <div>
      {product && (
        <div className="container">
          <div className="d-flex flex-column align-items-center gap-3">
            <h1 className="m-0">Edit Product: {product.name}</h1>
            <ProductImages />
            <ProductEditForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsEdit;
