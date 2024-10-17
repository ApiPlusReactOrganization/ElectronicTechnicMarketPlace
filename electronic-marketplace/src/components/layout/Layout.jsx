import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li>
              <Link to="/electronicItem">Electronic Item</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
