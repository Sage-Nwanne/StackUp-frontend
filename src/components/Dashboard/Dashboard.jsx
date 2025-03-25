import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import {index, deleteBoard,} from "../../services/boardService";
import './Dashboard.css';

const Dashboard = (props) => {
  const { user } = useContext(UserContext);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [boards, setBoards] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');  // Local search query
  const [filteredBoards, setFilteredBoards] = useState(boards);  // Filtered boards
 // Fetch boards when the component mounts or when user changes
 useEffect(() => {
  if (user) {
    fetchBoards();
  }
}, [user]); // Runs when the user is available
useEffect(() => {
  // Filter boards based on the search term
  const filtered = boards.filter((board) =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredBoards(filtered);
}, [searchTerm, boards]);

const fetchBoards = async () => {
  try {
    const data = await index(); // Call the index function from boardService to fetch boards
    setBoards(data); // Update state with the fetched boards
  } catch (error) {
    console.error("Error fetching boards:", error);
  }
};

    const handleBoardClick = (boardId) => {
        setSelectedBoardId(boardId);
        localStorage.setItem("selectedBoardId", boardId);
    };

    const handleDeleteBoard = async (boardId) => {
      try {
        // Call the deleteBoard function from boardService
        await deleteBoard(boardId);
  
        // Remove the deleted board from the state without reloading the page
        setFilteredBoards((prevBoards) => prevBoards.filter((board) => board._id !== boardId));
      } catch (error) {
        console.error("Error deleting board:", error);
      }
    };
 

    return (
        <main >
          <div className="entire-dashboard">
          <div className="top-ui">
          <h1 className="title"> {user.username}'s Boards</h1>
           <div className="local-search-container">
        <input
          type="text"
          placeholder="Search your boards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      </div>
      </div>
            
            
      <ul>
        {filteredBoards.length > 0 ? (
          filteredBoards.map((board) => (
            <li key={board._id} className="board-card">
              <Link 
                to={`/dashboard/${board._id}`}
                className="board-card-content"
                onClick={() => handleBoardClick(board._id)}
              >
                {board.name}
              </Link>
              <div className="board-card-actions">
                <button onClick={() => handleDeleteBoard(board._id)}>Delete</button>
                <button>
                  <Link to={`/dashboard/${board._id}/edit`}>Rename</Link>
                </button>
              </div>
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
