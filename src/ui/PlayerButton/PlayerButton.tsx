import { MouseEventHandler } from "react";
import classes from "./PlayerButton.module.scss";

interface Props {
  name: string;
  nickname: string;
  character?: string;
  altPic?: boolean;
  position?: 1 | 2 | 3 | number;
  onClick?: MouseEventHandler;
}

const PlayerButton: React.FC<Props> = ({
  name,
  nickname,
  character,
  altPic,
  position,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${classes.button} ${
        position === 1
          ? classes.first
          : position === 2
          ? classes.second
          : position === 3
          ? classes.third
          : classes.normal
      }`}
    >
      <div className={classes.strings}>
        <span>{name}</span>
        <span className={classes["minor-string"]}>| {nickname}</span>
      </div>
      <img
        className={classes.image}
        src={
          !character
            ? "src/assets/utils/default.png"
            : `src/assets/characters/${altPic ? "alt-" : ""}${character}.png`
        }
        onError={({ currentTarget }) => {
          currentTarget.src = `src/assets/utils/default.png`;
        }}
      ></img>
    </div>
  );
};

export default PlayerButton;
