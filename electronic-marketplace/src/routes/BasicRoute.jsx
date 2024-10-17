import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from '../components/layout/Layout';
import HomePage from '../pages/home/HomePage';
import ElectronicItemPage from '../pages/ElectronicItem/ElectronicItemPage';
import UsersPage from '../pages/users/UsersPage';
import NotFoundPage from '../components/NotFoundPage';

const BasicRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/electronicItem" element={<ElectronicItemPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default BasicRoute
