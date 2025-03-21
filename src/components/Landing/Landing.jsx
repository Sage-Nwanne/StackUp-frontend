import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

import "./Landing.css";

const Landing = () => {
  const { user } = useContext(UserContext);

  return (
    <main className="landingTitle">
      <div className="contentLeft">
        <h1>Stack Up</h1>
        <p>Plan and Produce Perfection</p>
        {!user ? (
          <button className="cta-button">
            <Link to="/sign-in">Sign In</Link>
          </button>
        ) : (
          <button className="cta-button"><Link to="/create">Create a Board</Link></button>
        )}
      </div>
      <div
        className="imagePlaceholder"
        aria-label="Placeholder for hero image"
      />
    </main>
  );
};

export default Landing;
