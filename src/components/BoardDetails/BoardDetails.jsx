import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const BoardDetails = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`${BASE_URL}/dashboard/${boardId}`, {

          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Board not found');
        }

        const data = await response.json();
        setBoard(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBoard();
  }, [boardId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!board) {
    return <div>Loading board details...</div>;
  }

  return (
    <div>
      <h2>{board.name}</h2>
      <div>
        {board.lists?.length > 0 ? (
          board.lists.map((list) => (
            <div key={list._id}>
              <h3>{list.name}</h3>
              <div>
                {list.cards?.length > 0 ? (
                  list.cards.map((card) => (
                    <div key={card._id}>
                      <h4>{card.name}</h4>
                    </div>
                  ))
                ) : (
                  <p>No cards in this list</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No lists found on this board</p>
        )}
      </div>
    </div>
  );
};

export default BoardDetails;
