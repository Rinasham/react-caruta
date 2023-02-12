import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <Link to="/game">Game</Link>
    </div>
  );
};

export default Home;
