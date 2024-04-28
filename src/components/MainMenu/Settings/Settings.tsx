import InputText from "../../../ui/InputText/InputText";
import Selector from "../../../ui/Selector/Selector";
import strings from "../../../assets/strings.json";
import classes from "./Settings.module.scss";
import Card from "../../../ui/Card/Card";
import games from "../../../assets/data/games.json";
import { useDispatch, useSelector } from "react-redux";
import { Game, State } from "../../../redux/state";
import {
  setAllPlayersStatus,
  setCircuits,
  setCupName,
  setGame,
  setPlayerStatus,
} from "../../../redux/store";
import { calculateTime } from "../../../interfaces/Circuit";

const Settings: React.FC = () => {
  const players = useSelector((state: State) => state.players);
  const cupName = useSelector((state: State) => state.cupName);
  const currentPlayers = players.filter((player) => player.isPlaying);
  const game = useSelector((state: State) => state.game);
  const totalCircuits = useSelector((state: State) => state.totalCircuits);
  const dispatch = useDispatch();

  const setOptions = (game: Game) => {
    let optionsArray = [
      { id: 4, name: "4" },
      { id: 8, name: "8" },
      { id: 16, name: "16" },
    ];
    if (
      [
        Game.supermk,
        Game.supercircuit,
        Game.ds,
        Game.wii,
        Game.seven,
        Game.eight,
        Game.eightdeluxe,
      ].includes(game)
    ) {
      optionsArray = optionsArray.concat([{ id: 20, name: "20" }]);
    }
    if (
      [Game.ds, Game.wii, Game.seven, Game.eight, Game.eightdeluxe].includes(
        game
      )
    ) {
      optionsArray = optionsArray.concat([{ id: 32, name: "32" }]);
    }
    if ([Game.eight, Game.eightdeluxe].includes(game)) {
      optionsArray = optionsArray.concat([{ id: 48, name: "48" }]);
    }
    if ([Game.eightdeluxe].includes(game)) {
      optionsArray = optionsArray.concat([{ id: 96, name: "96" }]);
    }
    return optionsArray;
  };

  return (
    <>
      <Card title={strings.settings}>
        <div className={classes.settings}>
          <div className={classes.field}>
            <label className={classes.label} htmlFor={strings.name}>
              {`🏆 ${strings.name}`}
            </label>
            <InputText
              onChange={(name: string) => {
                dispatch(setCupName(name));
              }}
              value={cupName}
            ></InputText>
          </div>
          <div className={classes.field}>
            <label
              className={classes.label}
              htmlFor={strings.players}
            >{`🎮 ${strings.players}`}</label>
            <Selector
              all={true}
              onAll={() => {
                dispatch(setAllPlayersStatus());
              }}
              multiple={true}
              selected={currentPlayers.map((player) => player.id)}
              options={players.map((player) => {
                return { id: player.id, name: player.nickname };
              })}
              onChange={(player: number) => {
                dispatch(setPlayerStatus(player));
              }}
              label={strings.players}
            ></Selector>
          </div>
          <div className={classes.field}>
            <label className={classes.label} htmlFor={strings.game}>
              {`💿 ${strings.game}`}
            </label>
            <Selector
              options={games}
              label={strings.game}
              selected={[game]}
              onChange={(game: string) => {
                dispatch(setCircuits(0));
                dispatch(setGame(game));
              }}
            ></Selector>
          </div>
          <div className={classes.field}>
            <label
              className={classes.label}
              htmlFor={`${strings.circuits}`}
            >{`🏁 ${strings.circuits}`}</label>
            <Selector
              selected={[totalCircuits]}
              options={setOptions(game as Game)}
              label={`${strings.circuits}`}
              onChange={(totalCircuits: string) => {
                dispatch(setCircuits(parseInt(totalCircuits)));
              }}
            ></Selector>
          </div>
          <div className={classes.field}>
            <label
              className={classes.label}
              htmlFor={`⏱️ ${strings.estimatedTime}`}
            >{`⏱️ ${strings.estimatedTime}`}</label>
            <span>{calculateTime(totalCircuits)}</span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Settings;
