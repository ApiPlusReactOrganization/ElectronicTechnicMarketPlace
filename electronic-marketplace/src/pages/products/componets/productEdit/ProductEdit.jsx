import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useActions from "../../../../hooks/useActions";
import ProductEditForm from "./ProductEditForm";
import ProductImages from "./ProductImages";
import { EditProductTitle } from "./EditProductTitle";

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

  const productWithoutImages = useMemo(() => {
    if (!product) return null;
    const { images, ...rest } = product;
    return rest;
  });

  // console.log("Rendering ProductsEdit", product);

  return (
    <div>
      {product && (
        <div className="container">
          <div className="d-flex flex-column align-items-center gap-3">
            <EditProductTitle name={product.name} />
            <ProductImages />
            <ProductEditForm product={productWithoutImages} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsEdit;
