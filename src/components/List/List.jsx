import { useDrop } from "react-dnd";
import Card from "../Card/Card";
import { Link } from "react-router";
const List = ({ list, onMoveCard }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "CARD",
        drop: (item) => onMoveCard(item.id, list._id),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className="list">
            <h3>{list.name}</h3>
            {list.cards.map((card) => (
                <Link 
                    key={card._id} 
                    to={`/dashboard/${list.boardId}/${list._id}/${card._id}`}
                >
                    <Card card={card} />
                </Link>
            ))}
        </div>
    );
};

export default List;

