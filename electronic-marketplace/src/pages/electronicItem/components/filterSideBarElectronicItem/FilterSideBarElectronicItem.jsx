import React, { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useActions from "../../../../hooks/useActions";
import useFilters from "../../../../hooks/useFilters";
import ManufacturerFilter from "../manufacturerFilter/ManufacturerFilter";
import MinMaxInput from "../minMaxInput/MinMaxInput";
import useDebouncedEffect from "../../../../hooks/useDebouncedEffect";

const MAX_PRICE_VAL = 50000;
const MAX_STOCK_QUANTITY = 100;

const FilterSideBarElectronicItem = memo(() => {
  const { categoryId } = useParams();
  const { filterProducts, getManufacturers, getManufacturersByCategoryId } =
    useActions();

  const initialFilters = {
    categoryId: categoryId || "",
    manufacturerIds: [],
    name: "",
    minPrice: 0,
    maxPrice: MAX_PRICE_VAL,
    minStockQuantity: 0,
    maxStockQuantity: MAX_STOCK_QUANTITY,
  };

  const { filters, updateFilter, cleanFilters } = useFilters(initialFilters);

  useEffect(() => {
    if (categoryId) {
      getManufacturersByCategoryId(categoryId);
    } else {
      getManufacturers();
    }
    updateFilter("categoryId", categoryId || "");
  }, [categoryId]);

  const handleManufacturerChange = useCallback((manufacturerIds) => {
    updateFilter("manufacturerIds", manufacturerIds);
  }, []);
 
  useDebouncedEffect(() => {
    const finalFilters = cleanFilters();
    filterProducts(finalFilters);
  }, 300, [filters]);


  return (
    <div className="filter-sidebar p-3 border rounded bg-light">
      <h3 className="mb-4 text-center">Фільтри</h3>

      <div className="mb-3">
        <label className="form-label">Назва</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={filters.name}
          onChange={(e) => updateFilter("name", e.target.value)}
        />
      </div>

      <MinMaxInput
        label="Ціна (грн)"
        minLimit={0}
        maxLimit={MAX_PRICE_VAL}
        step={100}
        initialMin={filters.minPrice}
        initialMax={filters.maxPrice}
        filterKeyMin="minPrice"
        filterKeyMax="maxPrice"
        onFilterChange={updateFilter}
      />

      <MinMaxInput
        label="Кількість в наявності"
        minLimit={0}
        maxLimit={MAX_STOCK_QUANTITY}
        step={1}
        initialMin={filters.minStockQuantity}
        initialMax={filters.maxStockQuantity}
        filterKeyMin="minStockQuantity"
        filterKeyMax="maxStockQuantity"
        onFilterChange={updateFilter}
      />

      <ManufacturerFilter
        selectedManufacturerIds={filters.manufacturerIds}
        onManufacturerChange={handleManufacturerChange}
      />
    </div>
  );
});

export default FilterSideBarElectronicItem;
