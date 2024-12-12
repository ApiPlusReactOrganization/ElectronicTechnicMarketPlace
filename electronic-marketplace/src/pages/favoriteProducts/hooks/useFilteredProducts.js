import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const useFilteredProducts = () => {
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts)

  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [quantityRange, setQuantityRange] = useState([0, 100])
  const [filteredProducts, setFilteredProducts] = useState([])

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

      return isNameMatch && isPriceMatch && isQuantityMatch
    })

    setFilteredProducts(filtered)
  }, [favoriteProducts, searchTerm, priceRange, quantityRange])

  return {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    quantityRange,
    setQuantityRange,
  }
}

export default useFilteredProducts
