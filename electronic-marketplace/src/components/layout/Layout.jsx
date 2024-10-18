import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import "./layout.css";


const Layout = () => {
  return (
    <>
      <div className="wrapper">
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
      </div>
    </>
  )
}

export default Layout
