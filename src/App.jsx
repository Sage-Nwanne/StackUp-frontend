import { Routes, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import BoardDetails from './components/BoardDetails/BoardDetails';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';

// Contexts
import { UserContext } from './contexts/UserContext';
import { useContext, useState, useEffect } from 'react';
import * as boardService from './services/boardService';

const App = () => {
  const { user } = useContext(UserContext);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchAllBoards = async () => {
      try {
        const boardsData = await boardService.index();
        setBoards(boardsData);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) fetchAllBoards();
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard boards={boards} /> : <SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/dashboard/:boardId" element={<BoardDetails />} />
      </Routes>
    </>
  );
};

export default App;
