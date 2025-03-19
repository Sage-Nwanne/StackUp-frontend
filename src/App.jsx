// react
import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

//components
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import * as boardService from './services/boardService';

//contexts
import { UserContext } from './contexts/UserContext';


const App = () => {
  const [boards, setBoards] = useState([]);
  const { user } = useContext(UserContext);

  //fetch all boards
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
  }, [user]) ;

    
  console.log(boards)

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard boards={boards}/> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
