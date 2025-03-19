import { Link } from "react-router";

const CardList = (props) => {
  return (
    <div>
      {props.cards.map((card) => {
        <Link>{card.title}</Link>;
      })}
    </div>
  );
};

export default CardList;
