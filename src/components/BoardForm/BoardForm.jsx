import { useState } from "react";

const BoardForm = (props) => {
  const [formData, setFormData] = useState({
    name: " ",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("this is firing");
    props.handleCreateBoard(formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Board Name</label>
        <input
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
        />
      <button type="submit">Add Board</button>
      </form>
    </main>
  );
};

export default BoardForm;
