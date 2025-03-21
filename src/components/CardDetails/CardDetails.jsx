import { useState, useEffect } from "react";
import { useParams } from "react-router";

import * as stackUpService from "../../services/StackUpService.js";
import CardForm from "../CardForm/CardForm.jsx";

const CardDetails = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);


  const handleAddText = async (cardFormData) => {
    const newCard = await stackUpService.createCard(cardId, cardFormData);
    setCard({ ...card, text: [...card.text, newCard] });
  };

  useEffect(() => {
    const fetchCard = async () => {
      const cardData = await stackUpService.card.show(cardId);
      setCard(cardData);
    };
    fetchCard();
  }, [cardId]);

  return (
    <main>
          <h2>{card.title}</h2>
          <CardForm handleAddText={handleAddText} />
    </main>
  );
};

export default CardDetails;
