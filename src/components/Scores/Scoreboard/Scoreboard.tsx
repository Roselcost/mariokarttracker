import { Player } from "../../../interfaces/player";
import classes from "./Scoreboard.module.scss";
import InputText from "../../../ui/InputText/InputText";
import { Score } from "../../../interfaces/Score";

interface Props {
  players: Player[];
  isCurrentCircuit: boolean;
  edit?: boolean;
  onChange?: (score: Score) => void | {};
}

const Scoreboard: React.FC<Props> = ({
  players,
  onChange,
  edit,
  isCurrentCircuit,
}) => {
  return (
    <>
      {players
        .sort((a, b) => {
          return a.position - b.position;
        })
        .map((player) => {
          return (
            <div
              key={player.id}
              className={`${classes.row}
                    ${
                      !isCurrentCircuit
                        ? player.position === 1
                          ? classes.first
                          : player.position === 2
                          ? classes.second
                          : player.position === 3
                          ? classes.third
                          : ""
                        : ""
                    }`}
            >
              <div className={classes.position}>
                {isCurrentCircuit && edit ? (
                  <InputText
                    min={1}
                    max={12}
                    special={true}
                    onChange={(value: number) => {
                      onChange &&
                        onChange({ player: player.id, position: value });
                    }}
                    value={player.position}
                  ></InputText>
                ) : (
                  <img src={`src/assets/numbers/${player.position}.png`}></img>
                )}
              </div>
              <div className={classes.character}>
                <img src={`src/assets/charicons/${player.character}.png`}></img>
              </div>
              <span className={classes.nickname}>{player.nickname}</span>
              <span className={classes.score}>{edit ? "-" : player.score}</span>
            </div>
          );
        })}
    </>
  );
};

export default Scoreboard;
