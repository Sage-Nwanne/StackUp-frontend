import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import * as cardService from "../../services/cardService";

const CardForm = (props) => {
  const navigate = useNavigate();
  const { cardId, boardId, listId } = useParams();
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [cards, setCards] = useState([]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (cardId) {
      handleUpdateCard(formData);
    } else {
      handleAddCard(formData);
      setFormData({ name: "", description: "" });
    }
  };


  const handleAddCard = async (formData) => {
    const newCard = await cardService.createCard(boardId, listId, formData);
    setCards([...cards, newCard]);
    navigate(`/dashboard/${boardId}/${listId}`);
  };

  const handleUpdateCard = async (formData) => {
    const updatedCard = await cardService.updateCard(boardId, listId, cardId, formData);
    setCards(cards.map((card) => (card._id === cardId ? updatedCard : card)));
    navigate(`/dashboard/${boardId}/${listId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name-input"> Name </label>
        <input
          required
          type="text"
          name="name"id="name-input"value={formData.name}onChange={handleChange}
        />
      <label htmlFor="name-input"> Description </label>
        <input
          required
          type="text"
          name="name"id="name-input"value={formData.name}onChange={handleChange}
        />
        <form action="/upload" method="post" encType="multipart/form-data" >
            <input type="file" name="image" id="image" />
            <button type="submit">Upload</button>
        </form>

        <button type="submit">{props.cardId ? <Link to={`/cards/${props.cardId}/edit`}>"Edit Card" </Link>: "Add Card" }</button>
      
    </form>
  );
};

export default CardForm;

