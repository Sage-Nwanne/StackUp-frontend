import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./Dashboard.css";  // Ensure you have proper styling

const Dashboard = (props) => {
  const { user } = useContext(UserContext);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');  // Local search query
  const [filteredBoards, setFilteredBoards] = useState(props.boards);  // Filtered boards

  useEffect(() => {
    // Filter boards based on the search term
    const filtered = props.boards.filter((board) =>
      board.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBoards(filtered);
  }, [searchTerm, props.boards]);

  const handleBoardClick = (boardId) => {
    setSelectedBoardId(boardId);
    localStorage.setItem("selectedBoardId", boardId);
  };

  return (
    <main className="dashboard-container">
      <h1>Welcome, {user.username}</h1>
      <h2>Your Boards</h2>

      {/* Local Search Input */}
      <div className="local-search-container">
        <input
          type="text"
          placeholder="Search your boards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <p>This is the dashboard page where you can see a list of your boards.</p>
      
      {/* Display Filtered Boards */}
      <ul>
        {filteredBoards.length > 0 ? (
          filteredBoards.map((board) => (
            <li key={board._id} className="board-item">
              <Link to={`/dashboard/${board._id}`} onClick={() => handleBoardClick(board._id)}>
                {board.name}
              </Link>
            </li>
          ))
        ) : (
          <li>No boards found.</li>
        )}
      </ul>
    </main>
  );
};

export default Dashboard;
