import React from "react";
import { useSelector } from "react-redux";
import useActions from "../../../../hooks/useActions";
import useDebouncedEffect from "../../../../hooks/useDebouncedEffect";
import MinMaxInput from "../minMaxInput/MinMaxInput";

const PriceFilter = () => {
  const minPrice = useSelector((state) => state.filters.minPrice);
  const maxPrice = useSelector((state) => state.filters.maxPrice);
  const { updateMinPrice, updateMaxPrice, filterProducts } = useActions();

  const handleMinPriceChange = (value) => {
    updateMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    updateMaxPrice(value);
  };

  useDebouncedEffect(
    () => {
      filterProducts();
    },
    500,
    [minPrice, maxPrice]
  );

  return (
    <MinMaxInput
      label="Ціна"
      minLimit={0}
      maxLimit={50000}
      step={100}
      valueMin={minPrice}
      valueMax={maxPrice}
      onMinChange={handleMinPriceChange}
      onMaxChange={handleMaxPriceChange}
    />
  );
};

export default PriceFilter;
