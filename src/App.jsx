import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router";

// Component Imports
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import BoardList from "./components/Board/BoardList/BoardList.jsx";
import CardList from "./components/Card/CardList/CardList.jsx";
import ListList from "./components/List/ListList/ListList.jsx";

// Service Import
import * as stackUpService from "./services/stackUpService.js";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);
  const [lists, setLists] = useState([]);

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
    if (user)
      fetchAllBoards()
    && fetchAllCards()
    && fetchAllLists()
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/board" element={<BoardList boards={boards}/>} />
            <Route path="/cards" element={<CardList cards={cards}/>} />
            <Route path="/lists" element={<ListList lists={lists}/>} />
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
