import strings from "../../../assets/strings.json";
import classes from "./Players.module.scss";
import Card from "../../../ui/Card/Card";
import PlayerButton from "../../../ui/PlayerButton/PlayerButton";
import { useSelector, useDispatch } from "react-redux";
import { Route, State } from "../../../redux/state";
import { setSelectedPlayer, setCurrentRoute } from "../../../redux/store";

const Players = () => {
  const players = useSelector((state: State) => state.players);
  const dispatch = useDispatch();
  const dispatchCurrentRoute = (playerId: number) => {
    dispatch(setSelectedPlayer(playerId));
    dispatch(setCurrentRoute(Route.editplayer));
  };
  return (
    <div className={classes.container}>
      <Card title={strings.players}>
        <div className={classes.players}>
          {[...players].map((player) => (
            <PlayerButton
              onClick={() => dispatchCurrentRoute(player.id)}
              key={player.id}
              name={player.name}
              nickname={player.nickname}
              character={player.character}
              altPic={player.altPic}
            ></PlayerButton>
          ))}
          <PlayerButton
            onClick={() => dispatchCurrentRoute(0)}
            name={strings.newPlayer}
            nickname={strings.createNewPlayer}
          ></PlayerButton>
        </div>
      </Card>
    </div>
  );
};

export default Players;
