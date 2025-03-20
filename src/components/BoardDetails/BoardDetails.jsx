import { useState, useEffect } from "react";
import { useParams } from "react-router";

import * as stackUpService from "../../services/StackUpService.js";

const BoardDetails = () => {
  const [board, setBoard] = useState(null);

  const { boardId } = useParams();

  useEffect(() => {
    const fetchBoard = async () => {
      const boardData = await stackUpService.board.show(boardId);
      setBoard(boardData);
    };
    fetchBoard();
  }, [boardId]);

  return (
    <main>
      <section>
        <header>
          <h2>{board.name}</h2>
        </header>
      </section>
    </main>
  );
};

export default BoardDetails;
