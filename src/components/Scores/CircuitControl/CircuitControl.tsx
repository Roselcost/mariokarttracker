import CircuitSelect from "../CircuitSelect/CircuitSelect";
import classes from "./CircuitControl.module.scss";
import strings from "../../../assets/strings.json";
import Button from "../../../ui/Button/Button";
import ProgressBar from "../../../ui/ProgressBar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { removeRoute, setCurrentRoute } from "../../../redux/store";
import { Route, State } from "../../../redux/state";
import { Circuit, calculateRemainingTime } from "../../../interfaces/Circuit";
import Dialog from "../../../ui/Dialog/Dialog";
import { SetStateAction, useEffect, useState } from "react";

interface Props {
  currentCircuit: number;
  totalCircuits: number;
  doneCircuits: number;
  onClick: (goTo: 1 | -1) => void | {};
}

const CircuitControl: React.FC<Props> = ({
  currentCircuit,
  totalCircuits,
  doneCircuits,
  onClick,
}) => {
  const cantGoToNextCircuit = () => {
    return (
      currentCircuit >= totalCircuits - 1 || // Last circuit
      !circuits[currentCircuit]?.name || // Circuit not yet defined
      circuits[currentCircuit]?.scores.length === 0 || // Scores not set
      circuits[currentCircuit]?.scores.reduce((acum, current) => {
        // Some score not set
        return !current.position ? true : acum;
      }, false)
    );
  };
  const dispatch = useDispatch();
  const activeRoute = useSelector((state: State) => state.activeRoute);
  const circuits: Circuit[] = useSelector((state: State) => state.circuits);
  const [animation, setAnimation] = useState("");
  const [lastAnimation, setLastAnimation] = useState("");
  useEffect(() => {
    if (["", "-"].includes(animation)) {
      animation === "-" ? setAnimation("") : setAnimation(lastAnimation);
    }
  }, [animation]);

  const animationRoutine = (animate: SetStateAction<string>) => {
    setAnimation("-");
    setLastAnimation(animate);
  };

  return (
    <div className={classes["circuit-container"]}>
      <div className={classes["circuit-controls"]}>
        {activeRoute.includes(Route.selectcircuit) && (
          <Dialog onClick={() => dispatch(removeRoute(Route.selectcircuit))}>
            <CircuitSelect currentCircuit={currentCircuit}></CircuitSelect>
          </Dialog>
        )}
        <div
          onClick={() => {
            dispatch(setCurrentRoute(Route.selectcircuit));
          }}
          className={`${animation} ${classes.circuit}`}
        >
          <span className={classes["circuit-label"]}>
            <div className={classes.info}>
              <span>
                🏁 {doneCircuits}/{totalCircuits}
              </span>
              <span>{`⏱️ ${strings.remainingEstimate}: ${calculateRemainingTime(
                circuits,
                totalCircuits
              )}`}</span>
            </div>
          </span>
          <img
            src={
              circuits[currentCircuit]?.name
                ? `src/assets/circuits/${circuits[currentCircuit]?.name}.jpg`
                : `src/assets/utils/nocircuit.png`
            }
          ></img>
        </div>
        <div className={classes.buttons}>
          <Button
            disabled={currentCircuit < 1}
            onClick={() => {
              animationRoutine("animate-back");
              onClick(-1);
            }}
            label="👈"
          ></Button>
          <Button
            disabled={cantGoToNextCircuit()}
            onClick={() => {
              animationRoutine("animate-forward");
              onClick(1);
            }}
            label="👉"
          ></Button>
        </div>
      </div>
      <ProgressBar value={doneCircuits} maxValue={totalCircuits}></ProgressBar>
    </div>
  );
};

export default CircuitControl;
