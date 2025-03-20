import { useState } from "react";

const BoardForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddBoard(formData);
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Board Name</label>
        <input
            type="text"
            name="name"
            id="name-input"
            value="{formData.name}"
            onChange={handleChange}
        />
      </form>
      <button type="submit">Add Board</button>
    </main>
  );
};

export default BoardForm;