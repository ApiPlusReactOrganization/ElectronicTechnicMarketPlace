import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import ProductCard from './components/productCard/ProductCard';
import SideBarCategory from "../electronicItem/components/sideBarCategory/SideBarCategory";
import UserMessage from '../../components/common/userMessage/UserMessage';
import FilterSideBarElectronicItem from './components/filterSideBarElectronicItem/FilterSideBarElectronicItem';

const ElectronicItemPage = () => {

  const products = useSelector((state) => state.product.productList);


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SideBarCategory />
        </div>
        <div className="col-md-6">
          <p>Electronic Item Page</p>
          <div>
            {products.length > 0 ? (
              <div className="row">
                {products.map((product) => (
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
          <FilterSideBarElectronicItem />
        </div>
      </div>
    </div>
  );
};

export default ElectronicItemPage;
