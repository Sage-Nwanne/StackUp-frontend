import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moveCard } from "../../services/cardService"; // Import moveCard function
import List from "../List/List";
import { create, index, update } from "../../services/listService.js";

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const BoardDetails = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [lists, setLists] = useState([]);
    const [editListId, setEditListId] = useState(null);
    const [editedListName, setEditedListName] = useState("");
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

    useEffect(() => {
      const fetchLists = async () => {
        try {
          const response = await index(boardId);
                  console.log(response.lists);
          setLists(response.lists);
        } catch (error) {
          console.error("Error fetching lists:", error);
        }
      };

      fetchLists();
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

    const handleAddList = async () => {
      try {
        const listName = "New List";
        const newList = await create(boardId, listName);

        setLists((prevLists) => [...prevLists, newList]);
      } catch (err) {
        console.error("Error making list.", err);
      }
    };

    const handleEditListClick = (listId, currentListName) => {
      setEditListId(listId);
      setEditedListName(currentListName);
    };

    const handleSaveEdit = async (listId) => {
      try {
        const updatedList = await update(listId, editedListName);
        setLists((prevList) => prevList.map((list) =>
        list._id === listId ? {...list, name: updatedList.name}: list))
        setEditListId(null);
      } catch (error) {
        console.error("Error editing list title", error);
      }
    }

    const handleCancelEdit = () => {
      setEditListId(null);
    }

    if (error) return <div>Error: {error}</div>;
    if (!board) return <div>Loading board details...</div>;

    return (
      <div>
        <h2>{board.name}</h2>
        <button onClick={handleAddList}>Add List</button>
        <div className="board-container">
          {lists?.length > 0 ? (
            lists.map((list) => (
              <div key={list._id}>
                {editListId === list._id ? (
                  <div>
                    <input
                      type="text"
                      value={editedListName}
                      onChange={(e) => setEditedListName(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(list._id)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <h3
                      onClick={() => handleEditListClick(list._id, list.name)}
                    >
                      {list.name}
                    </h3>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No lists found on this board</p>
          )}
        </div>
      </div>
    );
};

export default BoardDetails;
