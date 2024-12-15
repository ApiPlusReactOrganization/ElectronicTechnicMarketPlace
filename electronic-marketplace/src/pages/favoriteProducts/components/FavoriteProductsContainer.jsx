import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useActions from "../../../hooks/useActions";
import FavoriteProductsGrid from "./FavoriteProductsGrid";
import SearchField from "./filter/SearchField";
import MinMaxInput from "../../electronicItem/components/minMaxInput/MinMaxInput";
import { Paper, Typography } from "@mui/material";
import useFilteredProducts from "../hooks/useFilteredProducts";

const FavoriteProductsContainer = React.memo(() => {
  const { loadFavoriteProducts } = useActions();
  const userId = useSelector((state) => state.user.currentUser?.id);

  const {
    filteredProducts,
    searchTerm,
    maxPrice,
    setSearchTerm,
    setPriceRange,
    setQuantityRange,
  } = useFilteredProducts();

  const handleRangeChange = (key, value) => {
    if (key === "priceMin") setPriceRange((prev) => [value, prev[1]]);
    if (key === "priceMax") setPriceRange((prev) => [prev[0], value]);
    if (key === "quantityMin") setQuantityRange((prev) => [value, prev[1]]);
    if (key === "quantityMax") setQuantityRange((prev) => [prev[0], value]);
  };

  useEffect(() => {
    if (userId) {
      loadFavoriteProducts(userId);
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Paper
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Filters
            </Typography>
            <SearchField
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <MinMaxInput
              label="Price UAH"
              minLimit={0}
              maxLimit={maxPrice}
              step={100}
              filterKeyMin="priceMin"
              filterKeyMax="priceMax"
              onFilterChange={handleRangeChange}
            />
            <MinMaxInput
              label="Quantity"
              minLimit={0}
              maxLimit={100}
              step={1}
              filterKeyMin="quantityMin"
              filterKeyMax="quantityMax"
              onFilterChange={handleRangeChange}
            />
          </Paper>
        </div>
        <div className="col-md-9">
          <FavoriteProductsGrid favoriteProducts={filteredProducts} />
        </div>
      </div>
    </div>
  );
});

export default FavoriteProductsContainer;
