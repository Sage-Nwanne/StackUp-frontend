import { useState, useEffect } from "react";
import { useParams } from "react-router";

import * as cardService from "../../services/cardService.js";
import CardForm from "../CardForm/CardForm.jsx";

const CardDetails = () => {
  const { cardId, boardId, listId } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const cardData = await cardService.show(cardId);
        console.log('Fetched card data:', cardData); // Add this for debugging
        setCard(cardData);
      } catch (err) {
        console.error('Error details:', err); // Add this for debugging
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [cardId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!card) return <div>Card not found</div>;



  return (
    <main>
      <h2>Card Details</h2>
      <div className="card-details">
        <h3>{card.name}</h3>
        <p>{card.description}</p>
        <CardForm 
          cardId={cardId} 
          boardId={boardId} 
          listId={listId}
          initialData={card}
        />
      </div>
    </main>
  );
};

export default CardDetails;
