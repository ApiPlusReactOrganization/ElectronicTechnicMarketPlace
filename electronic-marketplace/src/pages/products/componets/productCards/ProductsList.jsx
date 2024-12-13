import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import useActions from "../../../../hooks/useActions";

const ProductsList = React.memo(() => {
  const productList = useSelector((state) => state.product.productList);
  const { getProducts } = useActions();

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="d-flex flex-row flex-wrap gap-3">
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});

export default ProductsList;
