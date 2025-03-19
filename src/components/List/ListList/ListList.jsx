import { Link } from "react-router";

const ListList = (props) => {
  return (
    <div>
      {props.list.map((list) => {
        <Link>{list.name}</Link>;
      })}
    </div>
  );
};

export default ListList;
