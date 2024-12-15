import React from "react";
import { Outlet } from "react-router-dom";
import AppSettingsHandler from "./AppSettingsHandler";
import Footer from "./Footer";
import Header from "./Header";
import "./layout.css";

const Layout = () => {
  return (
    <>
      <AppSettingsHandler />
      <div className="wrapper">
        <Header />
        <div className="containerLayout">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
