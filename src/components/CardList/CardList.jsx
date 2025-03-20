import { Link } from "react-router";

const CardList = (props) => {
  return (
    <div>
      {props.cards.map((card) => {
        <Link key={card._id} to={`/cards/${card._id}`}>
          {card.title}
        </Link>;
      })}
    </div>
  );
};

export default CardList;
