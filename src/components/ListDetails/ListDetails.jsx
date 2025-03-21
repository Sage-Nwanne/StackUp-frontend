import { useState, useEffect } from "react";
import { useParams } from "react-router";

import * as stackUpService from "../../services/StackUpService.js";

const ListDetails = () => {
  const [list, setList] = useState(null);

  const { listId } = useParams();

  useEffect(() => {
    const fetchList = async () => {
      const listData = await stackUpService.list.show(listId);
      setList(listData);
    };
    fetchList();
  }, [listId]);

  return (
    <main>
      <section>
        <header>
          <h2>{list.name}</h2>
        </header>
      </section>
    </main>
  );
};

export default ListDetails;
