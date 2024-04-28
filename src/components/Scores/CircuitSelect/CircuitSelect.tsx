import Card from "../../../ui/Card/Card";
import classes from "./CircuitSelect.module.scss";
import allCircuits from "../../../assets/data/circuits.json";
import strings from "../../../assets/strings.json";
import InputText from "../../../ui/InputText/InputText";
import { useDispatch, useSelector } from "react-redux";
import { removeRoute, setCurrentCircuitName } from "../../../redux/store";
import { Route, State } from "../../../redux/state";
import { useState } from "react";
import { Circuit } from "../../../interfaces/Circuit";

interface Props {
  currentCircuit: number;
}

const CircuitSelect: React.FC<Props> = ({ currentCircuit }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const circuits: Circuit[] = useSelector((state: State) => state.circuits);
  return (
    <Card title={strings.selectACircuit}>
      <div className={classes.container}>
        <div className={classes.search}>
          <label>🔎 </label>
          <InputText
            value={search}
            onChange={(searched: string) => setSearch(searched)}
          ></InputText>
        </div>
        <div className={classes.circuits}>
          {allCircuits
            .map((circuit) => circuit.name)
            .filter((circuitFromList) => {
              return !circuits
                .map((circuit: Circuit) => circuit.name)
                .includes(circuitFromList);
            })
            .filter((circuitName) => {
              return circuitName.toUpperCase().includes(search.toUpperCase());
            })
            .map((circuitName) => (
              <div
                onClick={() => {
                  dispatch(setCurrentCircuitName({ currentCircuit, circuitName }));
                  dispatch(removeRoute(Route.selectcircuit));
                }}
                key={circuitName}
                className={classes.circuit}
              >
                <span className={classes["circuit-label"]}>{circuitName}</span>
                <img src={`circuits/${circuitName}.jpg`}></img>
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
};

export default CircuitSelect;
