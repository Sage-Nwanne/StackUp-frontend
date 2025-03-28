import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { moveCard } from "../../services/cardService"; // Import moveCard function
import List from "../List/List";
import { create, update, deleteList } from "../../services/listService.js";
import { indexOne } from "../../services/boardService.js";
import { createCard } from "../../services/cardService.js";

const BoardDetails = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [editListId, setEditListId] = useState(null);
  const [editedListName, setEditedListName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const boardResponse = await indexOne(boardId);

        setBoard(boardResponse);
        setLists(boardResponse.lists);
      } catch (error) {
        console.error("Can't fetch board data", error);
      }
    };

    fetch();
  }, [boardId]);

  const handleMoveCard = async (cardId, newListId) => {
    try {
      const currentList = lists.find((list) =>
        list.cards.some((card) => card._id === cardId)
      );

      if (currentList && currentList._id === newListId) {
        return;
      }

   
      const updatedCard = await moveCard(boardId, cardId, newListId);

      if (updatedCard && updatedCard.card) {
        setLists((prevLists) => {
          const updatedLists = prevLists.map((list) => {
            if (list._id === newListId) {
              return { ...list, cards: [...list.cards, updatedCard.card] };
            } else if (list._id === currentList._id) {
              return {
                ...list,
                cards: list.cards.filter((card) => card._id !== cardId),
              };
            }
            return list;
          });

          return updatedLists;
        });
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
      const updatedList = await update(boardId, listId, editedListName);
      setLists((prevList) =>
        prevList.map((list) =>
          list._id === listId ? { ...list, name: updatedList.name } : list
        )
      );
      setEditListId(null);
    } catch (error) {
      console.error("Error editing list title", error);
    }
  };

  const handleCancelEdit = () => {
    setEditListId(null);
  };

  const handleDelete = async (listId) => {
    try {
      setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
      await deleteList(boardId, listId);
    } catch (error) {
      console.error("error deleting list", error);
    }
  };
  const handleAddCard = async (listId) => {
    const cardName = { name: "New Card" };
    const newCard = await createCard(boardId, listId, cardName);

    setLists((prevLists) => {
      return prevLists.map((list) => {
        if (list._id === listId) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        }
        return list;
      });
    });
  };
  if (error) return <div>Error: {error}</div>;
  if (!board) return <div>Loading board details...</div>;
  return (
    <div>
      <h2>{board.name}</h2>

      <button onClick={handleAddList}>Add List</button>
      <div className="board-container" style={{ display: "flex", gap: "20px" }}>
        {lists.length > 0 ? (
          lists.map((list) => (
            <div
              key={list._id}
              className="list-container"
              style={{ width: "250px" }}
            >
              {editListId === list._id ? (
                <div>
                  <input
                    type="text"
                    value={editedListName}
                    onChange={(e) => setEditedListName(e.target.value)}
                    autoFocus
                  />
                  <button onClick={() => handleSaveEdit(list._id)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <>
                  <h3 onClick={() => handleEditListClick(list._id, list.name)}>
                    {list.name}
                  </h3>

                  <button onClick={() => handleAddCard(list._id)}>
                    Add Card{" "}
                  </button>
                </>
              )}

              <List list={list} onMoveCard={handleMoveCard} />

              {/* Delete Button below the list */}
              <button onClick={() => handleDelete(list._id)}>
                Delete List
              </button>
            </div>
          ))
        ) : (
          <>
            <p>No Lists! Click the button above to add a list to this board</p>
          </>
        )}
      </div>
    </div>
  );
};

export default BoardDetails;
