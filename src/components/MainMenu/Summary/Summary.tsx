import strings from "../../../assets/strings.json";
import classes from "./Summary.module.scss";
import Card from "../../../ui/Card/Card";
import Button from "../../../ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { Route, State } from "../../../redux/state";
import { removeRoute, setCurrentRoute } from "../../../redux/store";
import { calculateTime } from "../../../interfaces/Circuit";

const Summary: React.FC = () => {
  const cupName = useSelector((state: State) => state.cupName);
  const players = useSelector((state: State) => state.players);
  const totalCircuits = useSelector((state: State) => state.totalCircuits);
  const game = useSelector((state: State) => state.game);
  const currentPlayers = players.filter((player) => player.isPlaying);
  const dispatch = useDispatch();
  return (
    <Card title="Summary">
      <div className={classes.container}>
        <div className={classes.content}>
          <h2 className={classes.text}>{`🏆 ${cupName}`}</h2>
          <div
            className={classes.text}
          >{`🏁 ${totalCircuits} ${strings.circuits}`}</div>
          <div className={classes.text}>
            {`⏱️ ${calculateTime(totalCircuits)}`}
          </div>
          <div className={classes.info}>
            <div className={classes.characters}>
              {currentPlayers.map((player) => (
                <div key={player.id} className={classes.character}>
                  <div className={classes.icon}>
                    <img
                      src={`src/assets/charicons/${player.character}.png`}
                    ></img>
                  </div>
                  <div className={classes["player-name"]}>
                    <span>{player.name}</span>
                    <span className={classes.nickname}>
                      | {player.nickname}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.cover}>
              <img src={`src/assets/covers/${game}.png`}></img>
            </div>
          </div>
        </div>
        <div className={classes.buttons}>
          <Button
            onClick={() => {
              dispatch(removeRoute(Route.summary));
              dispatch(removeRoute(Route.main));
              dispatch(setCurrentRoute(Route.scores));
            }}
            label={`${strings.start}!!`}
          ></Button>
          <Button
            onClick={() => {
              dispatch(removeRoute(Route.summary));
            }}
            label={strings.goBack}
          ></Button>
        </div>
      </div>
    </Card>
  );
};

export default Summary;
