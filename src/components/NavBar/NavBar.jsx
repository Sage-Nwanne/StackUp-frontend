import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';

const NavBar = ({ user }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    
    localStorage.removeItem('token'); 
    
    navigate('/sign-out');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">StackUp</Link>
        <ul className="nav-links">
          {!user ? (
            <>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/create">Create Board</Link></li>
              <li><Link to="/search">Board Search</Link></li>
              <li>
                <button 
                  className="sign-out-btn"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/sign-in"><button className="sign-in-btn">Sign In</button></Link></li>
              <li><Link to="/sign-up"><button className="sign-up-btn">Sign Up</button></Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
