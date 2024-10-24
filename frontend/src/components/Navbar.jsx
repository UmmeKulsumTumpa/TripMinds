import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import the AuthContext

const Navbar = () => {
  // Use the context to access user state and logout function
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="w-full fixed top-0 bg-gray-100 py-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Website Name on the Left */}
        <div className="text-xl font-bold">
          <Link to="/">TripMinds</Link>
        </div>

        {/* Links in the Center */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/itinerary" className="text-gray-700 hover:text-gray-900">
              Itinerary
            </Link>
          </li>
          <li>
            <Link to="/blog" className="text-gray-700 hover:text-gray-900">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/vlog" className="text-gray-700 hover:text-gray-900">
              Vlog
            </Link>
          </li>
        </ul>

        {/* Right-side links: Register/Login or Username/Logout */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/register" className="text-gray-700 hover:text-gray-900">
                Register
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700">Hello, {user.username}</span>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={logout}
              >
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
