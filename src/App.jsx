import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Game";
import Home from "./Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/game`} element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
