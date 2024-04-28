import classes from "./MainMenu.module.scss";
import Button from "../../ui/Button/Button";
import strings from "../../assets/strings.json";
import EditPlayer from "./EditPlayer/EditPlayer";
import Settings from "./Settings/Settings";
import Players from "./Players/Players";
import Summary from "./Summary/Summary";
import { useDispatch, useSelector } from "react-redux";
import { Route, State } from "../../redux/state";
import { removeRoute, setCurrentRoute } from "../../redux/store";
import Dialog from "../../ui/Dialog/Dialog";
import About from "./About/About";

const MainMenu = () => {
  const activeRoute = useSelector((state: State) => state.activeRoute);
  const players = useSelector((state: State) => state.players);
  const cupName = useSelector((state: State) => state.cupName);
  const game = useSelector((state: State) => state.game);
  const totalCircuits = useSelector((state: State) => state.totalCircuits);
  const activePlayers = players.filter((player) => player.isPlaying);
  const dispatch = useDispatch();
  return (
    <>
      {activeRoute.includes(Route.about) && (
        <Dialog onClick={() => dispatch(removeRoute(Route.about))}>
          <About></About>
        </Dialog>
      )}
      {activeRoute.includes(Route.editplayer) && (
        <Dialog onClick={() => dispatch(removeRoute(Route.editplayer))}>
          <EditPlayer></EditPlayer>
        </Dialog>
      )}
      {activeRoute.includes(Route.summary) && (
        <Dialog onClick={() => dispatch(removeRoute(Route.summary))}>
          <Summary></Summary>
        </Dialog>
      )}
      <h1 className={classes.h1}>Mario Kart Tracker</h1>
      <h2>{strings.welcome}</h2>
      <div className={classes["about-button"]}>
        <Button
          onClick={() => dispatch(setCurrentRoute(Route.about))}
          label="?"
        ></Button>
      </div>
      <Players></Players>
      <Settings></Settings>
      <div className={classes.start}>
        <Button
          disabled={
            !activePlayers.length || !cupName || !game || !totalCircuits
          }
          onClick={() => dispatch(setCurrentRoute(Route.summary))}
          label={strings.letsGo}
        ></Button>
      </div>
    </>
  );
};

export default MainMenu;
