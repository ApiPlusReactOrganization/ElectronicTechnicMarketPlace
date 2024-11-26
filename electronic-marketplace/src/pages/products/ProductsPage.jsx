import useActions from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import productImage from "../../hooks/productImage";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const productList = useSelector((state) => state.product.productList);
  const { getProducts } = useActions();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="float-start">
        {productList.map((product) => (
          <div className="d-flex gap-3 align-items-center my-2">
            <h3>
              <Link
                className="link-offset-2 link-underline link-underline-opacity-0"
                to={"edit/" + product.id}
              >
                {product.name}
              </Link>
            </h3>
            {product.images.length === 0 ? (
              <img
                height="100"
                width="100"
                alt="Product Image"
                loading="lazy"
                src={productImage(undefined)}
              />
            ) : (
              <div className="d-flex gap-3">
                {product.images.map((image) => (
                  <img
                    height="100"
                    width="100"
                    alt="Product Image"
                    loading="lazy"
                    src={productImage(image.filePath)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
