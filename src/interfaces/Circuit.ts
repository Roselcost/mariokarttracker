import { Score } from "./Score";
import allCircuits from "../assets/data/circuits.json";
import strings from "../assets/strings.json";

export interface Circuit {
  id: number;
  name: string;
  scores: Score[];
}

export const calculateTime = (totalCircuits: number) => {
  const allCircuitsInSeconds = allCircuits.reduce((acum, current) => {
    return acum + current.time;
  }, 0);
  const circuitAverageTime = allCircuitsInSeconds / allCircuits.length;
  const seconds = circuitAverageTime * totalCircuits;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hourString = hours
    ? `${hours} ${strings.hour}${hours > 1 ? "s" : ""}`
    : "";
  const minuteString = minutes
    ? `${minutes} ${strings.minute}${minutes > 1 ? "s" : ""}`
    : "";
  const comma = hours && minutes ? ", " : "";
  return `${hourString}${comma}${minuteString}`;
};

export const calculateRemainingTime = (
  circuits: Circuit[],
  totalCircuits: number
) => {
  const doneCircuitsNames = getDoneCircuitNames(circuits);
  const totalTimeRemovingDoneCircuits = getTotalTimeRemovingDoneCircuits(
    doneCircuitsNames,
    totalCircuits
  );
  const hours = Math.floor(totalTimeRemovingDoneCircuits / 3600);
  const minutes = String(
    Math.floor((totalTimeRemovingDoneCircuits % 3600) / 60)
  ).padStart(2, "0");
  return `${hours}:${minutes}h`;
};

export const getDoneCircuitNames = (circuits: Circuit[]) => {
  return circuits
    .filter((circuit) => {
      const scores = circuit.scores;
      if (!!scores.length) {
        return !!scores?.every((score) => !!score.position) && !!circuit.name;
      }
    })
    .map((circuit) => circuit.name);
};

const getTotalTimeRemovingDoneCircuits = (
  doneCircuitsNames: string[],
  totalCircuits: number
) => {
  const allCircuitsButDone = allCircuits.filter(
    (circuit) => !doneCircuitsNames.includes(circuit.name)
  );
  const allCircuitsButDoneTime = allCircuitsButDone
    .map((circuit) => circuit.time)
    .reduce((acum, current) => {
      return acum + current;
    }, 0);

  const meanTime = Math.floor(
    allCircuitsButDoneTime / (allCircuits.length - doneCircuitsNames.length)
  );
  const totalEstimatedTime = meanTime * totalCircuits;

  const remainingEstimatedTime =
    (totalEstimatedTime * (totalCircuits - doneCircuitsNames.length)) /
    totalCircuits;
  return remainingEstimatedTime;
};
