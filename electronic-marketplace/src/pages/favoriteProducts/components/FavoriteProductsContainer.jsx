import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useActions from '../../../hooks/useActions'
import FavoriteProductsGrid from './FavoriteProductsGrid'
import SearchField from './filter/SearchField'
import MinMaxInput from '../../electronicItem/components/minMaxInput/MinMaxInput'
import CategoryFilter from './filter/CategoryFilter'
import { Paper, Typography } from '@mui/material'

const FavoriteProductsContainer = React.memo(() => {
  const { loadFavoriteProducts, getCartItems } = useActions()
  const userId = useSelector((state) => state.user.currentUser.id)
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts)
  const { categoryId } = useParams()

  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [quantityRange, setQuantityRange] = useState([0, 100])
  const [filteredProducts, setFilteredProducts] = useState(favoriteProducts)

  const maxPrice = Math.max(
    ...favoriteProducts.map((product) => product.price),
    50000
  )

  const maxQuantity = Math.max(
    ...favoriteProducts.map((product) => product.stockQuantity),
    100
  )

  console.log('URL categoryId:', categoryId)
  console.log(
    'Product IDs:',
    favoriteProducts.map((p) => p.categoryId)
  )

  const handleRangeChange = (key, value) => {
    if (key === 'priceMin') setPriceRange((prev) => [value, prev[1]])
    if (key === 'priceMax') setPriceRange((prev) => [prev[0], value])
    if (key === 'quantityMin') setQuantityRange((prev) => [value, prev[1]])
    if (key === 'quantityMax') setQuantityRange((prev) => [prev[0], value])
  }

  useEffect(() => {
    const filtered = favoriteProducts.filter((product) => {
      const isNameMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const isPriceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1]
      const isQuantityMatch =
        product.stockQuantity >= quantityRange[0] &&
        product.stockQuantity <= quantityRange[1]
      const isCategoryMatch = !categoryId || product.categoryId === categoryId

      return isNameMatch && isPriceMatch && isQuantityMatch && isCategoryMatch
    })
    setFilteredProducts(filtered)
  }, [searchTerm, priceRange, quantityRange, categoryId, favoriteProducts])

  useEffect(() => {
    if (userId) {
      loadFavoriteProducts(userId)
      getCartItems()
    }
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Paper
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
              maxLimit={maxQuantity}
              step={1}
              filterKeyMin="quantityMin"
              filterKeyMax="quantityMax"
              onFilterChange={handleRangeChange}
            />
          </Paper>

          {/* Компонент фільтрації за категоріями */}
          <CategoryFilter />
        </div>
        <div className="col-md-9">
          <FavoriteProductsGrid favoriteProducts={filteredProducts} />
        </div>
      </div>
    </div>
  )
})

export default FavoriteProductsContainer
