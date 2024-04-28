import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button/Button";
import Card from "../../ui/Card/Card";
import classes from "./Scores.module.scss";
import strings from "../../assets/strings.json";
import GameOver from "./GameOver/GameOver";
import CircuitControl from "./CircuitControl/CircuitControl";
import { Route, State } from "../../redux/state";
import {
  removeRoute,
  setCircuit,
  setCurrentRoute,
  setScores,
} from "../../redux/store";
import {
  Player,
  getCurrentPlayerScores,
  getTotalPlayerScores,
} from "../../interfaces/player";
import jsonPoints from "../../assets/data/points.json";
import { useState } from "react";
import Scoreboard from "./Scoreboard/Scoreboard";
import { Circuit, getDoneCircuitNames } from "../../interfaces/Circuit";
import Dialog from "../../ui/Dialog/Dialog";
import Graph from "./Graph/Graph";
import { Score } from "../../interfaces/Score";

const Scores = () => {
  const currentCircuit = useSelector((state: State) => state.currentCircuit);
  const totalCircuits = useSelector((state: State) => state.totalCircuits);
  const circuits: Circuit[] = useSelector((state: State) => state.circuits);
  const cupName = useSelector((state: State) => state.cupName);
  const players: Player[] = useSelector((state: State) => state.players);
  const currentPlayersWithInfo = players.filter((player) => player.isPlaying);
  const activeRoute = useSelector((state: State) => state.activeRoute);
  const game = useSelector((state: State) => state.game);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const points: any = jsonPoints;

  const currentCircuitIndex = circuits.findIndex(
    (circuit) => circuit.id === currentCircuit
  );

  const currentPlayerScores: Player[] = getCurrentPlayerScores(
    currentPlayersWithInfo,
    circuits,
    currentCircuitIndex,
    points[game]
  );

  const totalPlayerScores: Player[] = getTotalPlayerScores(
    currentPlayersWithInfo,
    circuits,
    points[game]
  );

  const thisCircuitScores = currentPlayerScores.map((player) => {
    return {
      player: player.id,
      position: player.position,
    };
  });

  const circuitsWithScores = circuits.map((circuit) => {
    return {
      ...circuit,
      scores: circuit.scores.map((score) => {
        return {
          player: score.player,
          score: points[game][score.position],
        };
      }),
    };
  });

  let circuitsWithAccumulatedScores: any[] = [];
  circuitsWithScores.forEach((circuit, circuitIndex) => {
    const entry: any = { name: circuit.name };
    circuit.scores.forEach((score) => {
      const playerNickname =
        players.find((player) => player.id === score.player)?.nickname ?? "";
      const scoreFromPreviousCircuit =
        circuitsWithAccumulatedScores[circuitIndex - 1]?.[playerNickname] ?? 0;
      entry[playerNickname] = score.score + scoreFromPreviousCircuit;
    });
    if (entry.name) circuitsWithAccumulatedScores.push(entry);
  });

  return (
    <>
      {activeRoute.includes(Route.gameover) && (
        <Dialog onClick={() => dispatch(removeRoute(Route.gameover))}>
          <GameOver></GameOver>
        </Dialog>
      )}
      {activeRoute.includes(Route.graph) && (
        <Dialog onClick={() => dispatch(removeRoute(Route.graph))}>
          <Graph data={circuitsWithAccumulatedScores}></Graph>
        </Dialog>
      )}
      <h1>🏆 {cupName} 🏆</h1>
      <div className={classes.cards}>
        <Card
          title={
            circuits[currentCircuit]?.name
              ? circuits[currentCircuit].name
              : "???"
          }
          width="400px"
        >
          <Scoreboard
            onChange={(value: Score) => {
              const index = thisCircuitScores.findIndex(
                (playerScore) => playerScore.player === value.player
              );
              thisCircuitScores[index] = {
                player: value.player,
                position: value.position,
              };
            }}
            players={currentPlayerScores}
            edit={edit}
            isCurrentCircuit={true}
          ></Scoreboard>
          <div className={classes["card-buttons"]}>
            {edit && (
              <>
                <Button
                  onClick={() => {
                    setEdit(false);
                    dispatch(setScores(thisCircuitScores));
                  }}
                  label={strings.update}
                ></Button>
                <Button
                  onClick={() => {
                    setEdit(false);
                  }}
                  label={strings.cancel}
                ></Button>
              </>
            )}
            {!edit && (
              <Button
                onClick={() => setEdit(true)}
                label={strings.edit}
              ></Button>
            )}
          </div>
        </Card>
        <div className={classes.circuitControl}>
          <CircuitControl
            currentCircuit={currentCircuit}
            totalCircuits={totalCircuits}
            doneCircuits={getDoneCircuitNames(circuits).length}
            onClick={(goTo: 1 | -1) => {
              dispatch(setCircuit(goTo));
              const nextCircuitScores = circuits[currentCircuit + goTo]?.scores;
              const hasDefinedScores =
                !!nextCircuitScores?.length &&
                nextCircuitScores?.every((score) => {
                  return !!score.position;
                });
              setEdit(!hasDefinedScores && goTo === 1);
            }}
          ></CircuitControl>
        </div>
        <Card title={strings.totalScore} width="400px">
          <Scoreboard
            players={totalPlayerScores}
            isCurrentCircuit={false}
          ></Scoreboard>
          <div className={classes["card-buttons"]}>
            <Button
              disabled={!circuitsWithAccumulatedScores[0]}
              onClick={() => {
                dispatch(setCurrentRoute(Route.graph));
              }}
              label={strings.graph}
            ></Button>
            <Button
              onClick={() => {
                dispatch(setCurrentRoute(Route.gameover));
              }}
              type="danger"
              label={strings.finishGame}
            ></Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Scores;
