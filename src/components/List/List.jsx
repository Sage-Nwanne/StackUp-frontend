import React from "react";
import Card from "../Card/Card"; // Assuming you have a Card component

const List = ({ list }) => {
  return (
    <div>
      <h2>{list.name}</h2>
      <div>
        {list.cards && list.cards.length > 0 ? (
          list.cards.map((card) => <Card key={card._id} card={card} />)
        ) : (
          <p>No cards in this list</p>
        )}
      </div>
    </div>
  );
};

export default List;
