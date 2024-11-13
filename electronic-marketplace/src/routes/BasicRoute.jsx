import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomePage from "../pages/home/HomePage";
import ElectronicItemPage from "../pages/ElectronicItem/ElectronicItemPage";
import UsersPage from "../pages/users/UsersPage";
import NotFoundPage from "../components/NotFoundPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import ManufacturersPage from "../pages/manufacturers/ManufacturersPage";
import Register from "../pages/auth/register/Register";
import Login from "../pages/auth/login/Login";
import ProtectedRoute from "./ProtectedRoute";

const BasicRoute = () => {
  const { isAuth, role } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/electronicItem" element={<ElectronicItemPage />} />
          <Route path="/users" element={<UsersPage />} />
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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default BasicRoute;
