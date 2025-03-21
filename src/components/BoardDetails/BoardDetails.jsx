import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moveCard } from "../../services/cardService"; // Import moveCard function
import List from "../List/List";

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const BoardDetails = (props) => {
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
      <h1>{board.name} <button><Link to={`/board/${boardId}/edit`}>Rename Board</Link></button></h1>
      <div>
        {board.lists?.length > 0 ? (
          board.lists.map((list) => (
            <div key={list._id}>
              <h3>{list.name}</h3>
              <div>
                {list.cards?.length > 0 ? (
                  list.cards.map((card) => (
                    <div key={card._id}>
                      <h4>{card.name}</h4>
                    </div>
                  ))
                ) : (
                  <>
                  <h2>No cards in this list...yet</h2>
                  <button >Add Card</button>
                  </>
                  
                )}
              </div>
            </div>
          ))
        ) : (
          <>
          <p>No lists found on this board...yet</p>
          <button >Add List</button>
          </>
        )}
      <button onClick={() => props.handleDeleteBoard(boardId) }>Delete Board</button>
      </div>
    </div>
    
  );
};

export default BoardDetails;
