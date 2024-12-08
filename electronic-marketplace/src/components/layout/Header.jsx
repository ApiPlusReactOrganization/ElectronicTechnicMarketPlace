import "./layout.css";
import { Link, useNavigate } from "react-router-dom";
import useActions from "../../hooks/useActions";
import { useSelector } from "react-redux";
import userImage from "../../hooks/userImage";
import { memo } from "react";

const adminPages = [
  { title: 'Categories', path: '/categories' },
  { title: 'Manufacturers', path: '/manufacturers' },
  { title: 'Users', path: '/users' },
]

const Header = memo( () => {
  const { isAuth, role, currentUser } = useSelector((store) => store.user);
  const { logoutUser } = useActions();
  const navigate = useNavigate();
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts)
  const cartItems = useSelector((state) => state.cartItem.cartItems)
  const logoutHandler = () => {
    logoutUser()
    navigate('/')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container header-container">
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="15"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/electronicItem">Electronic Item</Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <Link to="/favoriteProducts" className="text-reset me-3">
              <i
                className={`fas fa-heart ${
                  favoriteProducts && favoriteProducts.length > 0
                    ? 'position-relative'
                    : ''
                }`}
              >
                {favoriteProducts && favoriteProducts.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1">
                    {favoriteProducts.length}
                  </span>
                )}
              </i>
            </Link>

            <Link to="/cartItems" className="text-reset me-3">
              <i
                className={`fas fa-shopping-cart ${
                  cartItems && cartItems.length > 0
                    ? 'position-relative'
                    : ''
                }`}
              >
                {cartItems && cartItems.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1">
                    {cartItems.length}
                  </span>
                )}
              </i>
            </Link>

            {(Array.isArray(role)
              ? role.includes('Administrator')
              : role === 'Administrator') && (
              <div className="dropdown">
                <a
                  className="text-reset me-3 dropdown-toggle hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-bell"></i>
                  <span className="badge rounded-pill badge-notification bg-danger">
                    Admin
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {adminPages.map((page) => (
                    <li key={page.path}>
                      <Link className="dropdown-item" to={page.path}>
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isAuth ? (
              <div className="dropdown">
                <a
                  className="dropdown-toggle d-flex align-items-center hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={userImage(currentUser?.image)}
                    className="rounded-circle"
                    height="25"
                    width="25"
                    alt="User Avatar"
                    loading="lazy"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  {(Array.isArray(role)
                    ? role.includes('User')
                    : role === 'User') && (
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        My Profile
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link className="dropdown-item" to="/settings">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logoutHandler}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-3">
                <Link to="/login" className="btn btn-outline-primary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary text-white">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
});

export default Header
