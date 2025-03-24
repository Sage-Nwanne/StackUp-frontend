import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import * as cardService from "../../services/cardService";

const CardForm = () => {
    const navigate = useNavigate();
    const { boardId, listId, cardId } = useParams();
    const [formData, setFormData] = useState({ name: "" });
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
            setFormData({ name: "" });
        }
    };

    const handleAddCard = async () => {
        console.log(listId);
        const newCard = await cardService.createCard(boardId, listId, formData);
        setCards([...cards, newCard]);
        navigate(`/dashboard/${boardId}`)
    };

    const handleUpdateCard = async (formData) => {
        const updatedCard = await cardService.updateCard(boardId, listId, cardId, formData);
        setCards(cards.map((card) => (card._id === cardId ? updatedCard : card)));
        navigate(`/dashboard/${boardId}`)

    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name-input"> Name </label>
            <input required type="text" name="name" id="name" value={formData.name} onChange={handleChange} />

            <button type="submit">{cardId ? "Edit Card" : "Add Card"}</button>
        </form>
    );
};

export default CardForm;
