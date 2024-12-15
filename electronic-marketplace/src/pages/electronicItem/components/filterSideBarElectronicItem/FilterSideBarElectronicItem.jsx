import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useActions from "../../../../hooks/useActions";
import ManufacturerFilter from "../manufacturerFilter/ManufacturerFilter";
import NameFilter from "../nameFilter/NameFilter";
import PriceFilter from "../minMaxInput/PriceFilter";
import QuantityFilter from "../minMaxInput/QuantityFilter";


const FilterSideBarElectronicItem = () => {
  return (
    <div>
      <h3>Фільтри</h3>
      <NameFilter />
      <PriceFilter />
      <QuantityFilter />
      <ManufacturerFilter />
    </div>
  );
};

export default FilterSideBarElectronicItem;
