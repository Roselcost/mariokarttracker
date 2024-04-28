import Button from "../../../ui/Button/Button";
import CharacterSelect from "./CharacterSelect/CharacterSelect";
import classes from "./EditPlayer.module.scss";
import InputText from "../../../ui/InputText/InputText";
import strings from "../../../assets/strings.json";
import { useDispatch, useSelector } from "react-redux";
import { Route, State } from "../../../redux/state";
import {
  deletePlayer,
  removeRoute,
  setCurrentRoute,
  setPlayer,
} from "../../../redux/store";
import { useState } from "react";
import Card from "../../../ui/Card/Card";
import Dialog from "../../../ui/Dialog/Dialog";
import Selector from "../../../ui/Selector/Selector";

const EditPlayer = () => {
  const activeRoute = useSelector((state: State) => state.activeRoute);
  const dispatch = useDispatch();
  const players = useSelector((state: State) => state.players);

  let selectedPlayer = players.find((player) => player.isSelected);
  if (!selectedPlayer)
    selectedPlayer = {
      id: 0,
      name: "",
      nickname: "",
      character: "",
      position: 0,
      score: 0,
      isPlaying: false,
      isSelected: false,
      altPic: false,
    };

  const [currentPlayer, setCurrentPlayer] = useState(selectedPlayer);

  return (
    <>
      {activeRoute.includes(Route.selectcharacter) && (
        <Dialog onClick={() => dispatch(removeRoute(Route.selectcharacter))}>
          <CharacterSelect
            selectedCharacter={currentPlayer.character}
            onChange={(character: string) => {
              setCurrentPlayer({ ...currentPlayer, character });
            }}
          ></CharacterSelect>
        </Dialog>
      )}
      <div className={classes.driverlicensecard}>
        <div className={classes.header}>
          <div className={classes.flag}>
            <div className={classes.flagbg}></div>
            <img src="src/assets/utils/mushroom.png"></img>
          </div>
          <h2 className={classes.driverlicense}>DRIVER LICENSE</h2>
          <span className={classes.mushroomkingdom}>Mushroom Kingdom</span>
        </div>
        <div className={classes.content}>
          <div className={classes.picture}>
            <img
              onError={({ currentTarget }) => {
                currentTarget.src = `src/assets/utils/default.png`;
              }}
              src={
                !currentPlayer.character
                  ? `src/assets/utils/default.png`
                  : `src/assets/characters/${
                      currentPlayer.altPic ? "alt-" : ""
                    }${currentPlayer.character}.png`
              }
            ></img>
          </div>
          <div className={classes.form}>
            <div className={classes.field}>
              <label className={classes.label}>{strings.name}</label>
              <InputText
                onChange={(name: string) => {
                  setCurrentPlayer({ ...currentPlayer, name });
                }}
                value={currentPlayer.name}
              ></InputText>
            </div>
            <div className={classes.field}>
              <label className={classes.label}>{strings.nickname}</label>
              <InputText
                onChange={(nickname: string) => {
                  setCurrentPlayer({ ...currentPlayer, nickname });
                }}
                value={currentPlayer.nickname}
              ></InputText>
            </div>
            <div className={classes.field}>
              <label className={classes.label}>{strings.character}</label>
              <Button
                onClick={() => {
                  dispatch(setCurrentRoute(Route.selectcharacter));
                }}
                label={currentPlayer.character || strings.choose}
              ></Button>
            </div>
            <div className={classes.field}>
              <label className={classes.label}>Picture</label>
              <Selector
                options={[
                  {
                    id: "😉",
                    name: "😉",
                  },
                  {
                    id: "😎",
                    name: "😎",
                  },
                ]}
                selected={[currentPlayer.altPic ? "😎" : "😉"]}
                onChange={() => {
                  setCurrentPlayer({
                    ...currentPlayer,
                    altPic: !currentPlayer.altPic,
                  });
                }}
              ></Selector>
            </div>
            <div className={classes.buttons}>
              <Button
                disabled={
                  !currentPlayer.name ||
                  !currentPlayer.nickname ||
                  !currentPlayer.character ||
                  players.some(
                    (player) =>
                      player.nickname === currentPlayer.nickname &&
                      player.id !== currentPlayer.id
                  ) ||
                  !/^[A-Za-z0-9]*$/.test(currentPlayer.nickname)
                }
                onClick={() => {
                  dispatch(setPlayer({ ...currentPlayer, isSelected: false }));
                  dispatch(removeRoute(Route.editplayer));
                }}
                label={
                  currentPlayer.id !== 0 ? strings.saveChanges : strings.create
                }
              ></Button>
              {currentPlayer.id !== 0 && (
                <Button
                  type="danger"
                  onClick={() => dispatch(setCurrentRoute(Route.warning))}
                  label={strings.delete}
                ></Button>
              )}
            </div>

            {activeRoute.includes(Route.warning) && (
              <Dialog onClick={() => dispatch(removeRoute(Route.warning))}>
                <Card title={strings.deletingElement}>
                  <h2 className={classes.warning}>{strings.deletingMessage}</h2>
                  <div className={classes["warning-buttons"]}>
                    <Button
                      type="danger"
                      onClick={() => {
                        dispatch(deletePlayer(currentPlayer.id));
                        dispatch(removeRoute(Route.warning));
                        dispatch(removeRoute(Route.editplayer));
                      }}
                      label={strings.delete}
                    ></Button>
                    <Button
                      onClick={() => dispatch(removeRoute(Route.warning))}
                      label={strings.goBack}
                    ></Button>
                  </div>
                </Card>
              </Dialog>
            )}
          </div>
          <div className={classes.decorations}>
            <div className={classes.line}></div>
            <div className={classes.vline}></div>
            <div className={classes.vline}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPlayer;
