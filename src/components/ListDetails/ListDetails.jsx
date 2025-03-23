import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Card from "../Card/Card.jsx";


const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const ListDetails = () => {
  const { boardId, listId } = useParams();
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(`${BASE_URL}/dashboard/${boardId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bear ${localStorage.getItem("token")}`,
          },
        });


        if (!response.ok) {
          throw new Error("List not found");
        }

        const data = await response.json();
        setList(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchList();
  }, [boardId, listId]);

  if (error) return <div>Error: {error}</div>;
  if (!list) return <div>Loading list...</div>

  return (
    <div>
      <h2>{list.name}</h2>
      <div className="list-container">
        {list.cards?.length > 0 ? (
          list.cards.map((card) => <Card key={card._id} list={card} />)
        ) : (
          <p>No cards found</p>
        )}
      </div>
    </div>
  );
};

export default ListDetails;
