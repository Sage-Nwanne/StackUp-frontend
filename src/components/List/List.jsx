import { useDrop } from "react-dnd";
import Card from "../Card/Card";
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
            {list.cards.map((card) => (
                <Card key={card._id} card={card} />
            ))}
        </div>
    );
};

export default List;
