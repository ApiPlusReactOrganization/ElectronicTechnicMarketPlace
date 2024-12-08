import React, { memo } from "react";
import FilterSideBarElectronicItem from "./components/filterSideBarElectronicItem/FilterSideBarElectronicItem";
import ProductListContainer from "./conteiners/ProductListContainer";
import SideBarCategoryContainer from "./conteiners/SideBarCategoryContainer";

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
