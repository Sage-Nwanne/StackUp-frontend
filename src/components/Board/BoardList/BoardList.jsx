import { Link } from "react-router";

const BoardList = (props) => {
  return (
    <div>
      {props.boards.map((board) => {
        <Link>
          <header>{board.name}</header>
        </Link>;
      })}
    </div>
  );
};

export default BoardList;
