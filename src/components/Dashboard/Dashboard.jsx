import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = ({ boards, setSelectedBoardId }) => {
  const { user } = useContext(UserContext);

  const handleBoardClick = (boardId) => {
    setSelectedBoardId(boardId); // Update selectedBoardId in App.jsx
    localStorage.setItem("selectedBoardId", boardId);
  };

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>This is the dashboard page where you can see a list of your boards.</p>
      <ul>
        {boards.map((board) => (
          <li key={board._id}>
            <Link 
              to={`/dashboard/${board._id}`} 
              onClick={() => handleBoardClick(board._id)}
            >
              {board.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
