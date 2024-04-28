import { Circuit } from "./Circuit";

export interface Player {
  id: number;
  name: string;
  nickname: string;
  character: string;
  position: number;
  score: number;
  isPlaying: boolean;
  isSelected: boolean;
  altPic: boolean;
}

export const getCurrentPlayerScores = (
  players: Player[],
  circuits: Circuit[],
  circuitIndex: number,
  gamePoints: any
) => {
  return players.map((player, i) => {
    const playerIndex = circuits[circuitIndex]?.scores.findIndex(
      (playerScore) => playerScore.player === player.id
    );
    const position = circuits[circuitIndex]?.scores[playerIndex]?.position;
    return {
      ...player,
      position: position ?? i + 1,
      score: position ? gamePoints[position] : 0,
    };
  });
};

export const getTotalPlayerScores = (
  players: Player[],
  circuits: Circuit[],
  gamePoints: any
) => {
  return players
    .map((player) => {
      const totalPlayerScore = circuits.reduce((acum, circuit) => {
        const index = circuits[circuit.id].scores.findIndex(
          (playerScore) => playerScore.player === player.id
        );
        const position = circuits[circuit.id].scores[index]?.position ?? 0;
        return acum + (gamePoints[position] ?? 0);
      }, 0);
      return { ...player, score: totalPlayerScore };
    })
    .sort((a, b) => b.score - a.score)
    .reduce((acum: Player[], player, index) => {
      const previousPosition = acum[acum.length - 1]?.position ?? 0;
      const position =
        acum[acum.length - 1]?.score === player.score
          ? previousPosition
          : index + 1;
      return acum.concat([{ ...player, position }]);
    }, []);
};
