import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/home/HomePage'
import ElectronicItemPage from '../pages/electronicItem/ElectronicItemPage'
import UsersPage from '../pages/users/components/UsersPage'
import NotFoundPage from '../components/NotFoundPage'
import CategoriesPage from '../pages/categories/CategoriesPage'
import ManufacturersPage from '../pages/manufacturers/components/ManufacturersPage'
import MyProfilePage from '../pages/myProfile/components/MyProfilePage'
import Register from '../pages/auth/register/Register'
import Login from '../pages/auth/login/Login'
import ProtectedRoute from './ProtectedRoute'
import ProductPage from '../pages/products/ProductsPage'
import ProductEdit from '../pages/products/productEdit/ProductEdit'
import ProductDetailsPage from '../pages/electronicItem/components/productDetailsPage/ProductDetailsPage'
import Loader from '../components/common/loader/Loader'
import { setStatus } from '../store/state/actions/appSettingActions'
import { store } from '../store/store'
import FavoriteProductPage from '../pages/favoriteProducts/FavoriteProductPage'
import { PageStatuses } from '../store/state/reduserSlises/appSettingSlice'

const BasicRoute = () => {
  const location = useLocation()
  const { pageStatus, apiRequestIsLoading } = useSelector(
    (state) => state.appSettings
  )

  useEffect(() => {
    if (pageStatus !== PageStatuses.GOOD) {
      setStatus(PageStatuses.GOOD)(store.dispatch)
    }
  }, [location])

  const GetErrorElement = () => {
    switch (pageStatus) {
      case PageStatuses.NOT_FOUND:
      case PageStatuses.BAD_REQUEST:
      case PageStatuses.TOO_MANY_REQUESTS:
        return <NotFoundPage />
      default:
        return null
    }
  }

  return (
    <>
      {apiRequestIsLoading && <Loader />}
      <Routes>
        <Route path="/" element={<Layout errorElement={GetErrorElement()} />}>
          <Route index element={<HomePage />} />
          <Route path="/products">
            <Route index element={<ProductPage />} />
            <Route path="edit/:productId" element={<ProductEdit />} />
          </Route>
          <Route path="/electronicItem">
            <Route index element={<ElectronicItemPage />} />
            <Route path=":categoryId" element={<ElectronicItemPage />} />
            <Route path="product/:productId" element={<ProductDetailsPage />} />
          </Route>

          <Route
            path="/favoriteProducts"
            element={
              <ProtectedRoute allowedRoles={['User']}>
                <FavoriteProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={['Administrator']}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute allowedRoles={['Administrator']}>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manufacturers"
            element={
              <ProtectedRoute allowedRoles={['Administrator']}>
                <ManufacturersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['User']}>
                <MyProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default BasicRoute
