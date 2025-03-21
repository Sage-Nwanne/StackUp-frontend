import { Link } from "react-router";

const ListList = (props) => {
  return (
    <div>
      {props.list.map((list) => {
        <Link key={list._id} to={`/lists/${list._id}`}>
          {list.name}
        </Link>;
      })}
    </div>
  );
};

export default ListList;
