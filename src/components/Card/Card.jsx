import { useState } from 'react';

const Card = ({ card, moveCardToAnotherList }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle hover events
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Function to handle moving the card to another list
  const handleMoveCard = (newListId) => {
    moveCardToAnotherList(card._id, newListId);
  };

  return (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        border: isHovered ? '2px solid #4CAF50' : '2px solid #ccc',
        padding: '10px',
        margin: '10px 0',
        cursor: 'pointer',
      }}
    >
      <h3>{card.name}</h3>
      {isHovered && (
        <div className="card-hover-details">
          <p>Click to move this card or view details</p>
          {/* Example of moving the card to another list */}
          <button onClick={() => handleMoveCard('newListIdHere')}>Move to another list</button>
        </div>
      )}
    </div>
  );
};

export default Card;
