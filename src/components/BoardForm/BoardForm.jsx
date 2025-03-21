import { useState, useEffect } from "react";
import { useParams } from "react-router";


const BoardForm = (props) => {
    const { boardId } = useParams();
    const [formData, setFormData] = useState({
        name: "",
    });

    useEffect(() => {
        if (boardId && props.boards.length > 0) {
            const board = props.boards.find((board) => board._id === boardId);
            if (board) {
                setFormData({ name: board.name });
            }
        }
    }, [boardId, props.boards]);

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (boardId) {
            props.handleUpdateBoard(boardId, formData);
        } else {
            props.handleCreateBoard(formData);
        }
    };

    return (
        <main>
            {boardId ? "Edit Board" : "New Board"}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name-input">Board Name</label>
                <input type="text" name="name" id="name-input" value={formData.name} onChange={handleChange} />
                <button type="submit">{boardId ? "Rename" : "Add Board"}</button>
            </form>
        </main>
    );
};

export default BoardForm;
