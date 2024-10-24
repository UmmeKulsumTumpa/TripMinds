import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import the AuthContext

const navStyles = {
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
};

const Navbar = () => {
  // Use the context to access user state and logout function
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={navStyles}>
      <div className="container-fluid">
        {/* Website Name on the Right Side */}
        <Link to="/" className="navbar-brand ml-auto">
          TripMinds
        </Link>

        {/* Links in the Middle */}
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/itinerary" className="nav-link">
                Itinerary
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/vlog" className="nav-link">
                Vlog
              </Link>
            </li>
          </ul>
        </div>

        {/* Register/Login on Left (if not logged in), Username and Logout (if logged in) */}
        <div className="navbar-nav ml-auto">
          {!user ? (
            <>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="navbar-text mr-3">Hello, {user.username}</span>
              <button className="btn btn-outline-danger" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
