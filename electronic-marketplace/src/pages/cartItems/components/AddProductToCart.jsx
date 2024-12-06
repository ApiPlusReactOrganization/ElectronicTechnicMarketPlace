import React, { useEffect, useState } from 'react'
import { FaShoppingCart, FaCheckCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import useActions from '../../../hooks/useActions'

const AddProductToCart = ({ productId }) => {
  const [isInCart, setIsInCart] = useState(false)

  const cartItems = useSelector((state) => state.cartItem.cartItems)
  const userId = useSelector((state) => state.user.userId)
  const { getCartItems, createCartItem } = useActions()

  useEffect(() => {
    setIsInCart(cartItems.some((item) => item.productId === productId))
  }, [cartItems, productId])

  useEffect(() => {
    getCartItems()
  }, [getCartItems])

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        productId,
        userId,
        quantity: 1,
      }

      await createCartItem(cartItem)
      toast.success('Product added to cart!')
    } catch (error) {
      console.error('Error adding item to cart:', error)
      const errorMessage =
        error.response?.data?.errors?.Message || 'Failed to add item to cart.'
      toast.error(errorMessage)
    }
  }

  return (
    <div>
      {isInCart ? (
        <FaCheckCircle size={24} color="green" title="In Cart" />
      ) : (
        <FaShoppingCart
          size={24}
          color="gray"
          title="Add to Cart"
          onClick={handleAddToCart}
          style={{ cursor: 'pointer' }}
        />
      )}
    </div>
  )
}

export default AddProductToCart
