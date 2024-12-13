import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import useActions from '../../hooks/useActions'

const CartItemsPage = () => {
  const cartItems = useSelector((state) => state.cartItem.cartItemList)
  const userId = useSelector((state) => state.user.currentUser.id)
  const { getCartItems } = useActions()

  useEffect(() => {
    if (userId) {
      getCartItems()
    }
  }, [])

  const userCartItems = useMemo(() => {
    return cartItems.filter((item) => item.userId === userId)
  }, [cartItems])

  return (
    <div>
      <h1>Your Cart</h1>
      {userCartItems.length > 0 ? (
        <ul>
          {userCartItems.map((item) => (
            <li key={item.id}>
              <strong>Product ID:</strong> {item.productId} |{' '}
              <strong>Quantity:</strong> {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  )
}

export default CartItemsPage
