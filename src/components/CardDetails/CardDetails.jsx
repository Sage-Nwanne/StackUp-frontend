import { useState, useEffect } from "react";
import { useParams } from "react-router";

import * as cardService from "../../services/cardService.js";
import CardForm from "../CardForm/CardForm.jsx";

const CardDetails = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState([]);


  useEffect(() => {
    const fetchCard = async () => {
      const cardData = await cardService.show(cardId);
      setCard(cardData);
    };
    fetchCard();
  }, [cardId]);

  return (
    <main>
          <h2>{card.name}</h2>
          <CardForm cardId={cardId} />
    </main>
  );
};

export default CardDetails;
