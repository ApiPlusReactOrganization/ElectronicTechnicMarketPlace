import React, { memo } from 'react'
import ProductList from './productList/ProductList'
import SideBarCategory from './sideBarCategory/SideBarCategory'
import FilterSideBarElectronicItem from './filterSideBarElectronicItem/FilterSideBarElectronicItem'

const ProductListContainer = memo(() => {
  const basePath = '/electronicItem'

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SideBarCategory basePath={basePath} />
        </div>
        <div className="col-md-6">
          <ProductList />
        </div>
        <div className="col-md-3">
          <FilterSideBarElectronicItem />
        </div>
      </div>
    </div>
  )
})

export default ProductListContainer
