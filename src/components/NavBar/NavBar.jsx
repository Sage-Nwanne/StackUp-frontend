import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/'); 
  };

  return (
    <nav className="navbar">
    <div className="nav-container">
      <Link to="/" className="logo">StackUp</Link>
      <div className="nav-links">
        {user ? (
          <>
            <h2><Link to="/dashboard">Dashboard</Link></h2>
            <h2><Link to="/create">Create Board</Link></h2>
            <p>
              <button className="sign-out-btn" onClick={handleSignOut}>Log Out</button>
            </p>
          </>
        ) : (
          <>
            <p><Link to="/">Home</Link></p>
            <p><Link to="/sign-in"><button className="sign-in-btn">Sign In</button></Link></p>
            <p><Link to="/sign-up"><button className="sign-up-btn">Sign Up</button></Link></p>
          </>
        )}
      </div>
      </div>
    </nav>
  );
};

export default NavBar;
