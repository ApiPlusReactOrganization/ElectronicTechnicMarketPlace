import { useSelector } from 'react-redux'

const useMaxPrice = () => {
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts);

  const maxPrice = favoriteProducts.length > 0
    ? Math.max(...favoriteProducts.map((product) => product.price))
    : 50000;

  return maxPrice;
}

export default useMaxPrice
