import React, { memo, useEffect } from 'react'
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
import ErrorPage from '../pages/errorPages/ErrorPage'

const BasicRoute = memo(() => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
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
              <ProtectedRoute allowedRoles={['User', 'Administrator']}>
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
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
})

export default BasicRoute
