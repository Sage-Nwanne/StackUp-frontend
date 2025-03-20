import { useState } from "react";

const CardForm = (props) => {
    const [formData, setFormData] = useState({ text: ""});

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddText(formData);
        setFormData({ text: "" });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="">
                <textarea
                    required
                    type="text"
                    name="text"
                    id="text-input"
                    value={formData.text}
                    onChange={handleChange}
                />
                <button type="submit">Add Card</button>
            </label>
        </form>
    );
};

export default CardForm;