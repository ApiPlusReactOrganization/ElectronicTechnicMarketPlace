import React, { useEffect, useState } from "react";
import useActions from "../../../../hooks/useActions";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MinMaxInput from "../minMaxInput/MinMaxInput";

const MAX_PRICE_VAL = 50000;
const MAX_STOCK_QUANTITY = 100;

const FilterSideBarElectronicItem = () => {
  const { filterProducts, getManufacturers, getManufacturersByCategoryId } = useActions();
  const { categoryId } = useParams();
  const [filters, setFilters] = useState({
    categoryId: "",
    manufacturerIds: [],
    name: "",
    minPrice: 0,
    maxPrice: MAX_PRICE_VAL,
    minStockQuantity: 0,
    maxStockQuantity: MAX_STOCK_QUANTITY,
  });

  const [isManufacturerListVisible, setIsManufacturerListVisible] =
    useState(false);

  const manufacturerList = useSelector(
    (state) => state.manufacturer.manufacturerList
  );



  useEffect(() => {
    if (categoryId) {
      getManufacturersByCategoryId(categoryId);
      setFilters((prev) => ({
        ...prev,
        categoryId,
      }));
    } else {
      getManufacturers();

      setFilters((prev) => ({
        ...prev,
        categoryId: "",
      }));
    }
  }, [categoryId]);

  useEffect(() => {
    const cleanFilters = (filters) => {
      return Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => {
          if (Array.isArray(value)) return value.length > 0;
          return value !== "" && value !== null && value !== undefined;
        })
      );
    };

    const finalFilters = cleanFilters(filters);
    filterProducts(finalFilters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, name: e.target.value }))
          }
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
        onFilterChange={handleFilterChange}
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
        onFilterChange={handleFilterChange}
      />

      <div className="mb-3">
        <button
          className="btn btn-secondary w-100"
          onClick={() =>
            setIsManufacturerListVisible(!isManufacturerListVisible)
          }
        >
          {isManufacturerListVisible
            ? "Приховати виробників"
            : "Показати виробників"}
        </button>
        {isManufacturerListVisible && (
          <div className="mt-3">
            {manufacturerList.map((manufacturer) => (
              <div
                key={manufacturer.id}
                className="form-check mb-2 d-flex align-items-center"
              >
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={filters.manufacturerIds.includes(manufacturer.id)}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      manufacturerIds: prev.manufacturerIds.includes(
                        manufacturer.id
                      )
                        ? prev.manufacturerIds.filter(
                            (id) => id !== manufacturer.id
                          )
                        : [...prev.manufacturerIds, manufacturer.id],
                    }))
                  }
                />
                <label className="form-check-label">{manufacturer.name}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSideBarElectronicItem;
