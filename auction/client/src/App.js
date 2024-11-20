import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles.css';
import Home from './Home';
import Auctions from './Auctions';
import Contact from './Contact';
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import AddAuctionItem from './AddAuctionItem'; // Import the AddAuctionItem component
// import logo from './logo(1).png'; // Import the logo image

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
  };

  return (
    <Router>
      <div>
        <header className="header">
          <div className="logo-container">
            {/* <img src={logo} alt="Logo" className="logo" /> */}
            <Link to="/" className="site-title-link">
              <h1 className="site-title">BidBazaar</h1>
            </Link>
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/auctions">Auctions</Link>
            <Link to="/contact">Contact Us</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile">Profile</Link>
                <Link to="/add-auction-item">Add Auction Item</Link> {/* Add link to the form */}
                <span>Welcome, {username}</span>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </>
            ) : (
              <>
                <Link to="/sign-up">Sign Up</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auctions"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Auctions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-auction-item"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AddAuctionItem />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sign-up" element={<SignUp onSignUp={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2024 Auction Website. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;