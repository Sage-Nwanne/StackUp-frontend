import { useDrag } from "react-dnd";
import {deleteCard} from "../../services/cardService"
import { useState } from "react";
import {updateCard} from "../../services/cardService"
import { useParams } from "react-router";
const Card = ({ card }) => {
  const {boardId} = useParams();
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: card._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isDeleted, setIsDeleted] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [editedCardName, setEditedCardName] = useState(card.name)

  const handleDeleteCard  = async () => {
    try {
      setIsDeleted(true);
      await deleteCard(card.boardId, card.listId, card._id);
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleEditCard = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedCard = {name: editedCardName}
      await updateCard(boardId, card.listId, card._id,updatedCard);
      card.name = editedCardName;
      setIsEditing(false);
    } catch (error) {
      console.error("error editing card", error);
    }
  }
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedCardName(card.name); 
  };
  if (isDeleted) return null;
  return (
    <div ref={drag} className="card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedCardName}
            onChange={(e) => setEditedCardName(e.target.value)}
            autoFocus
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Back</button>
          <button onClick={handleDeleteCard}>🗑️</button>
        </div>
      ) : (
        <h3 onClick={handleEditCard}>{card.name}</h3>
      )}
    </div>
  );
};

export default Card;
