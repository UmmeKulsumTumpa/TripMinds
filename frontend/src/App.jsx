import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
// import ItineraryPage from './pages/ItineraryPage';
// import BlogPage from './pages/BlogPage';
// import VlogPage from './pages/VlogPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container" style={{ marginTop: '80px' }}>
          <Routes>
          <Route path="/" element={<Home />} />
            {/* <Route path="/itinerary" element={<ItineraryPage />} /> */}
            {/* <Route path="/blog" element={<BlogPage />} />
            <Route path="/vlog" element={<VlogPage />} /> */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
