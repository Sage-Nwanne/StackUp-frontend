import { Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


// Components
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./components/Dashboard/Dashboard";
import BoardDetails from "./components/BoardDetails/BoardDetails";
import BoardForm from "./components/BoardForm/BoardForm.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";

// Contexts
import { UserContext } from "./contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as boardService from "./services/boardService";
import Landing from "./components/Landing/Landing";
import CardForm from "./components/CardForm/CardForm.jsx";
import CardDetails from "./components/CardDetails/CardDetails.jsx";
// import ListForm from "./components/ListForm/ListForm.jsx";

const App = () => {
  const { user } = useContext(UserContext);
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const navigate = useNavigate();

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

  const handleCreateBoard = async (boardFormData) => {
    try {
      const newBoard = await boardService.create(boardFormData);
      setBoards([ ...boards, newBoard]);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBoard = async (boardId, formData) => {
    console.log(formData)
    const updatedBoard = await boardService.update(boardId, formData);
    setBoards(boards.map((board) => (boardId === board._id ? updatedBoard : board)));
    navigate("/dashboard");
  };
  

  return (
    <DndProvider backend={HTML5Backend}>

        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/dashboard" element={user ? <Dashboard boards={boards} /> : <SignInForm />} />
          {/* <Route path="/dashboard/:boardId/:ListForm" element={<ListForm listForm={lists} />} /> */}
          <Route path="/dashboard/:boardId/:listId" element={<CardForm  />} />
          <Route path="/dashboard/:boardId/:listId/:cardId" element={<CardDetails />} />
          <Route path="/dashboard/:boardId/:listId/edit" element={<CardForm  />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/dashboard/:boardId" element={<BoardDetails />} />
          <Route path="/dashboard/:boardId/edit" element={<BoardForm boards={boards} handleUpdateBoard={handleUpdateBoard} />} />
          <Route path="/create" element={<BoardForm handleCreateBoard={handleCreateBoard} />}/>
        </Routes>
    
    </DndProvider>
  );
};

export default App;
