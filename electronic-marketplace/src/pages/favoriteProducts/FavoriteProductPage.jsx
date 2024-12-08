import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useActions from '../../hooks/useActions'
import FavoriteProductsGrid from './components/FavoriteProductsGrid'

const FavoriteProducts = () => {
  const { loadFavoriteProducts } = useActions()
  const userId = useSelector((state) => state.user.userId)

  useEffect(() => {
    if (userId) {
      loadFavoriteProducts(userId)
    }
  }, [])

  return <FavoriteProductsGrid />
}

export default FavoriteProducts
