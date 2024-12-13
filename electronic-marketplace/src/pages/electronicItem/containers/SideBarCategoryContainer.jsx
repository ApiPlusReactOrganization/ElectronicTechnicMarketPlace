import React, { memo } from "react";
import SideBarCategory from "../components/sideBarCategory/SideBarCategory";

const SideBarCategoryContainer = memo(() => {
    const basePath = '/electronicItem';
  return (
    <>
      <SideBarCategory basePath={basePath}/>
    </>
  );
});

export default SideBarCategoryContainer;
