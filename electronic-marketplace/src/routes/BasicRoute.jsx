import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "../components/common/loader/Loader";
import Layout from "../components/layout/Layout";
import NotFoundPage from "../components/NotFoundPage";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import CategoriesPage from "../pages/categories/CategoriesPage";
import ProductDetailsPage from "../pages/electronicItem/components/productDetailsPage/ProductDetailsPage";
import ElectronicItemPage from "../pages/electronicItem/ElectronicItemPage";
import HomePage from "../pages/home/HomePage";
import ManufacturersPage from "../pages/manufacturers/components/ManufacturersPage";
import MyProfilePage from "../pages/myProfile/components/MyProfilePage";
import ProductEdit from "../pages/products/productEdit/ProductEdit";
import ProductPage from "../pages/products/productsPage";
import UsersPage from "../pages/users/components/UsersPage";
import { setStatus } from "../store/state/actions/appSettingActions";
import { PageStatuses } from "../store/state/reduserSlises/appSettingSlice";
import { store } from "../store/store";
import ProtectedRoute from "./ProtectedRoute";


const BasicRoute = () => {
  const location = useLocation();
  const { pageStatus, apiRequestIsLoading } = useSelector(
    (state) => state.appSettings
  );


  useEffect(() => {
    if (pageStatus != PageStatuses.GOOD) {
      setStatus(PageStatuses.GOOD)(store.dispatch);
    }
  }, [location]);

  const GetErrorElement = () => {
    switch (pageStatus) {
      case PageStatuses.NOT_FOUND:
        return <NotFoundPage />;
      case PageStatuses.BAD_REQUEST:
        return <NotFoundPage />;
      case PageStatuses.TOO_MANY_REQUESTS:
        return <NotFoundPage />;
      default:
        return null;
    }
  };
  

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
              <Route
                path="product/:productId"
                element={<ProductDetailsPage />}
              />
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
    </>
  );
};

export default BasicRoute