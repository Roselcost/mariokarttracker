import "./App.scss";
import MainMenu from "./components/MainMenu/MainMenu";
import Scores from "./components/Scores/Scores";
import { Route, State } from "./redux/state";
import { useSelector } from "react-redux";

function App() {
  const activeRoute = useSelector((state: State) => state.activeRoute);
  return (
    <>
      {activeRoute.includes(Route.scores) && (
        <div className="animate-opacity main">
          <Scores></Scores>
        </div>
      )}
      {activeRoute.includes(Route.main) && (
        <div className="animate-opacity main">
          {activeRoute.includes(Route.main) && <MainMenu></MainMenu>}
        </div>
      )}
    </>
  );
}

export default App;
