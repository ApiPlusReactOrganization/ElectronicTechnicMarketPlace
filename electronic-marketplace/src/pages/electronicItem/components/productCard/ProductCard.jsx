import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../../../assets/images/noImageProduct.png';
import productImage from '../../../../hooks/productImage';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const imageUrl = product.images && product.images.length > 0 
    ? productImage(product.images[0].filePath)
    : defaultImage;

  const handleViewDetails = () => {
    navigate(`/electronicItem/product/${product.id}`);
  };

  return (
    <div className="card mb-3" style={{ maxWidth: '18rem' }}>
      <div className="card-body  text-center">
        <img
          src={imageUrl}
          alt={product.name}
          className="card-img-top"
          style={{ width: '100%', height: 'auto' }}
        />
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-truncate">{product.description}</p>
        <p className="card-text">Price: ${product.price}</p>
        <button className="btn btn-primary" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
