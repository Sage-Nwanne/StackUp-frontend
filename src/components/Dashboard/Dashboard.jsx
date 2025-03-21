import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import {index, deleteBoard, update} from "../../services/boardService";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');  // Local search query
    const { user } = useContext(UserContext);
    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [boards, setBoards] = useState(props.boards);
    const [filteredBoards, setFilteredBoards] = useState(props.boards);
 // Fetch boards when the component mounts or when user changes
 useEffect(() => {
  if (user) {
    fetchBoards();
  }
}, [user]); // Runs when the user is available
useEffect(() => {
  // Filter boards based on the search term
  const filtered = props.boards.filter((board) =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredBoards(filtered);
}, [searchTerm, props.boards]);

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
        <main>
           <div className="local-search-container">
        <input
          type="text"
          placeholder="Search your boards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
            <h1>Welcome, {user.username}</h1>
            <h2>Your Boards</h2>
            <p>This is the dashboard page where you can see a list of your boards.</p>
             {/* Display Filtered Boards */}
      <ul>
        {filteredBoards.length > 0 ? (
          filteredBoards.map((board) => (
            <li key={board._id} className="board-item">
              <Link to={`/dashboard/${board._id}`} onClick={() => handleBoardClick(board._id)}>
                {board.name}
              </Link>
              <button onClick={() => handleDeleteBoard(board._id)}>Delete</button>
              <button> <Link to={`/dashboard/${board._id}/edit`}>Rename</Link></button>
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
