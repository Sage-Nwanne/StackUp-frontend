import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');  // Redirect to the home page after signing out
  };

  // Fetch boards based on the search query
  useEffect(() => {
    const fetchBoards = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(`/api/boards/search?query=${query}`);
        if (!response.ok) throw new Error('Failed to fetch boards');
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching boards:', error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchBoards, 300);  // Debouncing
    return () => clearTimeout(delayDebounce);  // Cleanup on re-render
  }, [query]);

  const handleBoardClick = (id) => {
    navigate(`/boards/${id}`);
    setQuery('');  // Clear the search query
    setResults([]);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">StackUp</Link>

        {/* Global Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search boards..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />

          {loading && <div className="loading">Loading...</div>}

          {query && results.length > 0 && (
            <div className="search-results">
              {results.map((board) => (
                <div
                  key={board._id}
                  className="search-item"
                  onClick={() => handleBoardClick(board._id)}
                >
                  <h4>{board.name}</h4>
                  <p>{board.description}</p>
                </div>
              ))}
            </div>
          )}

          {query && results.length === 0 && !loading && (
            <div className="no-results">No boards found</div>
          )}
        </div>

        <ul className="nav-links">
          {user ? (
            <>
              <li>Welcome, {user.username}</li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/create">Create Board</Link></li>
              <li>
                <button className="sign-out-btn" onClick={handleSignOut}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
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
