import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useActions from "../../hooks/useActions";
import ProductCard from "./components/productCard/ProductCard";
import SideBarCategory from "../electronicItem/components/sideBarCategory/SideBarCategory";
import UserMessage from "../../components/common/userMessage/UserMessage";
import FilterSideBarElectronicItem from "./components/filterSideBarElectronicItem/FilterSideBarElectronicItem";
import ProductList from "./components/productList/ProductList";
import SideBarCategoryContainer from "./conteiners/SideBarCategoryContainer";
import ProductListContainer from "./conteiners/ProductListContainer";

const ElectronicItemPage = memo(() => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SideBarCategoryContainer />
        </div>
        <div className="col-md-6">
          <ProductListContainer />
        </div>
        <div className="col-md-3">
          <FilterSideBarElectronicItem />
        </div>
      </div>
    </div>
  );
});

export default ElectronicItemPage;
