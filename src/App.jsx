import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

// Component Imports
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import BoardDetails from "./components/BoardDetails/BoardDetails.jsx";
import BoardForm from "./components/BoardForm/BoardForm.jsx";
import CardList from "./components/CardList/CardList.jsx";
import CardDetails from "./components/CardDetails/CardDetails.jsx";
import ListList from "./components/ListOfList/ListOfList.jsx";
import ListDetails from "./components/ListDetails/ListDetails.jsx";

// Service Import
import * as stackUpService from "./services/StackUpService.js";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);
  const [lists, setLists] = useState([]);

  const navigate = useNavigate();

  // refactor later for dryer code
  useEffect(() => {
    const fetchAllBoards = async () => {
      const boardsData = await stackUpService.boardIndex();

      setBoards(boardsData);
    };

    const fetchAllCards = async () => {
      const cardsData = await stackUpService.cardIndex();

      setCards(cardsData);
    };

    const fetchAllLists = async () => {
      const listsData = await stackUpService.listIndex();

      setLists(listsData);
    };
    if (user) fetchAllBoards() && fetchAllCards() && fetchAllLists();
  }, [user]);

  const handleAddBoard = async (boardFormData) => {
    const newBoard = await stackUpService.create(boardFormData);
    setBoards([newBoard, ...boards]);
    navigate("/boards");
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/cards" element={<CardList cards={cards} />} />
            <Route path="/lists" element={<ListList lists={lists} />} />
            <Route path="/boards/:boardId" element={<BoardDetails />} />
            <Route path="/boards/new" element={<BoardForm handleAddBoard={handleAddBoard}/>} />
            <Route path="/cards/:cardId" element={<CardDetails />} />
            <Route path="/lists/:listId" element={<ListDetails />} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
