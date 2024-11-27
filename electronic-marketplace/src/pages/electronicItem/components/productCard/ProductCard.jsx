import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/electronicItem/product/${product.id}`);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">Price: ${product.price}</p>
        <button className="btn btn-primary" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
