import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useActions from '../../../../hooks/useActions';
import UserMessage from '../../../../components/common/userMessage/UserMessage';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { getProductById } = useActions();
  const products = useSelector((state) => state.product.productList);

  useEffect(() => {
    if (productId) {
      const fetchedProduct = products.find((p) => p.id === productId);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      } else {
        getProductById(productId).then((data) => setProduct(data));
      }
    }
  }, [productId, products, getProductById]);

  if (!product) {
    return <UserMessage message="Loading product details..." />;
  }

  return (
    <div className="container">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetailsPage;
