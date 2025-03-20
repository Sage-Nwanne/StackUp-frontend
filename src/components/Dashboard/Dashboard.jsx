import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = (props) => {
  const { user } = useContext(UserContext);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const handleBoardClick = (boardId) => {
    setSelectedBoardId(boardId);
    localStorage.setItem("selectedBoardId", boardId);
  };

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <h2>Your Boards</h2>
      <p>This is the dashboard page where you can see a list of your boards.</p>
      <ul>
        {props.boards.map((board) => (
          <li key={board._id} className="board-item">
            <Link to={`/dashboard/${board._id}`} onClick={() => handleBoardClick(board._id)}>
              {board.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
