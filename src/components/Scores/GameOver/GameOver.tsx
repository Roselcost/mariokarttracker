import Card from "../../../ui/Card/Card";
import Scoreboard from "../Scoreboard/Scoreboard";
import classes from "./GameOver.module.scss";
import Button from "../../../ui/Button/Button";
import PlayerButton from "../../../ui/PlayerButton/PlayerButton";
import ProgressBar from "../../../ui/ProgressBar/ProgressBar";
import strings from "../../../assets/strings.json";
import { useDispatch, useSelector } from "react-redux";
import { Route, State } from "../../../redux/state";
import { newGame, removeRoute, setCurrentRoute } from "../../../redux/store";
import { Circuit, getDoneCircuitNames } from "../../../interfaces/Circuit";
import jsonPoints from "../../../assets/data/points.json";
import { Player, getTotalPlayerScores } from "../../../interfaces/player";
const points: any = jsonPoints;

const GameOver = () => {
  const players = useSelector((state: State) => state.players);
  const currentPlayersWithInfo = players.filter((player) => player.isPlaying);
  const circuits: Circuit[] = useSelector((state: State) => state.circuits);

  const game = useSelector((state: State) => state.game);

  const totalPlayerScores: Player[] = getTotalPlayerScores(
    currentPlayersWithInfo,
    circuits,
    points[game]
  );

  const totalCircuits = useSelector((state: State) => state.totalCircuits);
  const doneCircuits = getDoneCircuitNames(circuits).length;
  const dispatch = useDispatch();
  const podium = [];
  if (!!totalPlayerScores[1]) podium.push(totalPlayerScores[1]);
  if (!!totalPlayerScores[0]) podium.push(totalPlayerScores[0]);
  if (!!totalPlayerScores[2]) podium.push(totalPlayerScores[2]);
  return (
    <>
      <Card title={strings.finalResults}>
        <div className={classes.container}>
          <div className={classes.content}>
            <div className={classes.podium}>
              <div className={classes.positions}>
                {podium.map((player) => {
                  return (
                    <div
                      key={player.id}
                      className={player.position === 1 ? classes.first : ""}
                    >
                      <span className={classes.icon}>
                        {player.position === 1
                          ? "🏆"
                          : player.position === 2
                          ? "🥈"
                          : player.position === 3
                          ? "🥉"
                          : ""}
                      </span>
                      <PlayerButton
                        name={player.name}
                        nickname={player.nickname}
                        character={player.character}
                        position={player.position}
                        altPic={player.altPic}
                      ></PlayerButton>
                    </div>
                  );
                })}
              </div>
              <div className={classes.progress}>
                <ProgressBar
                  value={doneCircuits}
                  maxValue={totalCircuits}
                ></ProgressBar>
                <span>{`${doneCircuits} / ${totalCircuits}`}</span>
              </div>
            </div>
            <div className={classes.scoreboard}>
              <Scoreboard
                isCurrentCircuit={false}
                players={totalPlayerScores}
              ></Scoreboard>
            </div>
          </div>
          <div className={classes.buttons}>
            <Button
              onClick={() => {
                dispatch(removeRoute(Route.gameover));
              }}
              label={strings.continue}
            ></Button>
            <Button
              onClick={() => {
                dispatch(newGame());
                dispatch(removeRoute(Route.gameover));
                dispatch(removeRoute(Route.scores));
                dispatch(setCurrentRoute(Route.main));
              }}
              label={strings.newGame}
            ></Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default GameOver;
