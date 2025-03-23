import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moveCard } from "../../services/cardService"; // Import moveCard function
import List from "../List/List";
import { create, update, deleteList } from "../../services/listService.js";
import { indexOne } from "../../services/boardService.js";



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
    }, [boardId])

    const handleMoveCard = async (cardId, newListId) => {
        try {
            // Update the backend first
            const updatedCard = await moveCard(boardId, cardId, newListId);
    
            if (updatedCard && updatedCard.card) {
                // Update the local state to reflect the card being moved
                setLists((prevLists) => {
                    // Remove the card from its current list
                    const updatedLists = prevLists.map((list) => {
                        if (list._id === newListId) {
                            // If the list matches the new list, add the card to it
                            return { ...list, cards: [...list.cards, updatedCard.card] };
                        } else {
                            // Remove the card from the original list
                            return {
                                ...list,
                                cards: list.cards.filter((card) => card._id !== cardId),
                            };
                        }
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
            setLists((prevLists) => prevLists.filter((list) => list._id !== listId))
            await deleteList(boardId, listId);
            fetch();
        } catch (error) {
            console.error("error deleting list", error)
            
        }
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
                             <List list={list} onMoveCard={handleMoveCard} />
                            {editListId === list._id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedListName}
                                        onChange={(e) => setEditedListName(e.target.value)}
                                    />
                                    <button onClick={() => handleSaveEdit(list._id)}>
                                        Rename
                                    </button>
                                    <button onClick={handleCancelEdit}>Cancel</button>
                                    <button onClick={() => handleDelete(list._id)}>Delete</button>
                                </div>
                            ) : (
                                <div>
                                    <h3 onClick={() => handleEditListClick(list._id, list.name)}>
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
