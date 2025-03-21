import { useState } from "react";
import { useParams } from "react-router";

const BoardForm = (props) => {
  const { boardId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (boardId) {
      props.handleUpdateBoard(boardId, formData);
    } else {
      props.handleCreateBoard(formData);
    };
  };

  return (
    <main>
      <h2>{boardId ? "Edit Board" : "New Board"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Board Name</label>
        <input
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
        />
      <button type="submit">{boardId ? "Update Board" : "Add Board"}</button>
      </form>
    </main>
  );
};

export default BoardForm;
