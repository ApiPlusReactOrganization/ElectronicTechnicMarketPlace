import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useActions from "../../../hooks/useActions";
import FavoriteProductsGrid from "./FavoriteProductsGrid";
import SideBarCategory from "../../electronicItem/components/sideBarCategory/SideBarCategory";
import FilterSideBarFavoriteProducts from "./FilterSideBarFavoriteProducts";

const FavoriteProductsContainer = React.memo(() => {
  const { loadFavoriteProducts, getCartItems } = useActions();
  const userId = useSelector((state) => state.user.currentUser.id);

  const basePath = "/favoriteProducts";

  useEffect(() => {
    if (userId) {
      loadFavoriteProducts(userId);
      getCartItems();
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SideBarCategory basePath={basePath} />
        </div>
        <div className="col-md-6">
          <FavoriteProductsGrid />
        </div>
        {/* <div className="col-md-3">
          <FilterSideBarFavoriteProducts />
        </div> */}
      </div>
    </div>
  );
});

export default FavoriteProductsContainer;
