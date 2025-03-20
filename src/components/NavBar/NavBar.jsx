import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./NavBar.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/"); // Redirect to the home page after signing out
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          StackUp
        </Link>
        <ul className="nav-links">
          {user ? (
            <>
              <li>Welcome, {user.username}</li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/board/new">Create Board</Link>
              </li>
              <li>
                <Link to="/search">Board Search</Link>
              </li>
              <li>
                <button className="sign-out-btn" onClick={handleSignOut}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/sign-in">
                  <button className="sign-in-btn">Sign In</button>
                </Link>
              </li>
              <li>
                <Link to="/sign-up">
                  <button className="sign-up-btn">Sign Up</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
