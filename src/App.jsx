import { Routes, Route } from "react-router-dom";

// Components
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./components/Dashboard/Dashboard";
import BoardDetails from "./components/BoardDetails/BoardDetails";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";

// Contexts
import { UserContext } from "./contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import * as boardService from "./services/boardService";
import Landing from "./components/Landing/Landing";

const App = () => {
    const { user } = useContext(UserContext);
    const [boards, setBoards] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState(null); 

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
            
            <NavBar selectedBoardId={selectedBoardId} />

            <Routes>
              <Route path="/" element={<Landing boards={boards} />} />
                <Route
                    path="/dashboard"
                    element={
                        user ? <Dashboard boards={boards} setSelectedBoardId={setSelectedBoardId} /> : <SignInForm />
                    }
                />
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route path="/sign-in" element={<SignInForm />} />
               
                <Route path="/dashboard/:boardId" element={<BoardDetails />} />
            </Routes>
        </>
    );
};

export default App;
