import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = (props) => {
  const { user } = useContext(UserContext);

  


  return (
    <>
    <main>
      <h1>My Boards</h1>
      <p>
        This is the dashboard page where you can see a list of all your boards.
      </p>
      <ul>
        {props.boards.map(board => (
          <li key={board._id}><Link to={`/${board._id}`}>{board.name}</Link></li>
        ))}
      </ul>
    </main>
    </>
  );
};

export default Dashboard;
