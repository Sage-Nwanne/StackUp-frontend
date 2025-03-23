import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { moveCard } from "../../services/cardService"; // Import moveCard function
import List from "../List/List";
import {create} from "../../services/boardService";

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const BoardDetails = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await fetch(`${BASE_URL}/dashboard/${boardId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Board not found");
                }

                const data = await response.json();
                setBoard(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBoard();
    }, [boardId]);

    const handleMoveCard = async (cardId, newListId) => {
        try {
            const updatedCard = await moveCard(boardId, cardId, newListId);

            if (updatedCard && updatedCard.card) {
                setBoard((prevBoard) => ({
                    ...prevBoard,
                    lists: prevBoard.lists.map((list) => {
                        if (list._id === newListId) {
                            if (!list.cards.some((card) => card._id === cardId)) {
                                return {
                                    ...list,
                                    cards: [...list.cards, updatedCard.card],
                                };
                            }
                        } else if (list.cards.some((card) => card._id === cardId)) {
                            return {
                                ...list,
                                cards: list.cards.filter((card) => card._id !== cardId),
                            };
                        }
                        return list;
                    }),
                }));
            }
        } catch (error) {
            console.error("Error moving card:", error);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!board) return <div>Loading board details...</div>;

    return (
        <div>
            <h2>{board.name}</h2>
            <div className="board-container">
                {board.lists.length > 0 ? (
                    board.lists.map((list) => (
                        <div key={list._id}>
                            <List list={list} onMoveCard={handleMoveCard} />
                            <Link 
                                to={`/dashboard/${board._id}/${list._id}/CardForm`}
                                className="add-card-button"
                            >
                                Add Card
                            </Link>
                        </div>
                    ))
                ) : (
                    <>
                        <p>No lists found on this board</p>
                        <button>
                            <Link to={`/dashboard/${board._id}/CardForm`}>Add Card</Link>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default BoardDetails;
