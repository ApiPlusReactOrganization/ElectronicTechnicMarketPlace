import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/home/HomePage";
import ElectronicItemPage from "../pages/ElectronicItem/ElectronicItemPage";
import UsersPage from "../pages/users/UsersPage";
import NotFoundPage from "../components/NotFoundPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import ManufacturersPage from "../pages/manufacturers/ManufacturersPage";
import MyProfilePage from "../pages/myProfile/MyProfilePage";
import Register from "../pages/auth/register/Register";
import Login from "../pages/auth/login/Login";
import ProtectedRoute from "./ProtectedRoute";
import ProductPage from "../pages/products/productsPage";
import ProductEdit from "../pages/products/productEdit/ProductEdit";
import ProductDetailsPage from "../pages/electronicItem/components/productDetailsPage/ProductDetailsPage";

const BasicRoute = () => {
  return (
    <BrowserRouter>
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
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["Administrator"]}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute allowedRoles={["Administrator"]}>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manufacturers"
            element={
              <ProtectedRoute allowedRoles={["Administrator"]}>
                <ManufacturersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["User"]}>
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
  );
};

export default BasicRoute;
