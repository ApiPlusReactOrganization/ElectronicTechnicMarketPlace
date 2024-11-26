import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/home/HomePage'
import ElectronicItemPage from '../pages/ElectronicItem/ElectronicItemPage'
import UsersPage from '../pages/users/components/UsersPage'
import NotFoundPage from '../components/NotFoundPage'
import CategoriesPage from '../pages/categories/CategoriesPage'
import ManufacturersPage from '../pages/manufacturers/components/ManufacturersPage'
import MyProfilePage from '../pages/myProfile/MyProfilePage'
import Register from '../pages/auth/register/Register'
import Login from '../pages/auth/login/Login'
import ProtectedRoute from './ProtectedRoute'

const BasicRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/electronicItem" element={<ElectronicItemPage />} />
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
    </BrowserRouter>
  )
}

export default BasicRoute
