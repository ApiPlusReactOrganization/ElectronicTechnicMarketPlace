import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useActions from '../../hooks/useActions'
import FavoriteProductsGrid from './components/FavoriteProductsGrid'

const FavoriteProducts = () => {
  const { loadFavoriteProducts, getCartItems } = useActions()
  const userId = useSelector((state) => state.user.currentUser.id)

  useEffect(() => {
    if (userId) {
      loadFavoriteProducts(userId)
      getCartItems()
    }
  }, [])

  return <FavoriteProductsGrid />
}

export default FavoriteProducts
