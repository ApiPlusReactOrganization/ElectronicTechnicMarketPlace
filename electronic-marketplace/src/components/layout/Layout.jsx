import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import "./layout.css";

const Layout = ({errorElement}) => {
  return (
    <>
      <div className="wrapper">
      <Header />
      <div className="container">
      {errorElement ? errorElement : <Outlet />}
      </div>
      <Footer />
      </div>
    </>
  )
}

export default Layout
