import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import ProductCard from './components/productCard/ProductCard';
import SideBarCategory from "../electronicItem/components/sideBarCategory/SideBarCategory";
import UserMessage from '../../components/common/userMessage/UserMessage';

const ElectronicItemPage = () => {
  const { categoryId } = useParams();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { getProductsByCategoryId } = useActions();
  const products = useSelector((state) => state.product.productList);

  useEffect(() => {
    if (categoryId) {
      getProductsByCategoryId(categoryId);
      setSelectedProducts([]);
    }
  }, [categoryId]);

  useEffect(() => {
    setSelectedProducts(products);
  }, [products]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SideBarCategory />
        </div>
        <div className="col-md-6">
          <p>Electronic Item Page</p>
          <div>
            {selectedProducts.length > 0 ? (
              <div className="row">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="col-md-4">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <UserMessage message="No products available" />
            )}
          </div>
          
        </div>
        <div className="col-md-3">
          <SideBarCategory />
        </div>
      </div>
    </div>
  );
};

export default ElectronicItemPage;

