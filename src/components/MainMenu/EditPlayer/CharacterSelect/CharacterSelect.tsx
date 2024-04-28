import Card from "../../../../ui/Card/Card";
import classes from "./CharacterSelect.module.scss";
import characters from "../../../../assets/data/characters.json";
import strings from "../../../../assets/strings.json";
import { useDispatch } from "react-redux";
import { removeRoute } from "../../../../redux/store";
import { Route } from "../../../../redux/state";

interface Props {
  onChange: (character: string) => void | {};
  selectedCharacter: string;
}

const CharacterSelect: React.FC<Props> = ({ onChange, selectedCharacter }) => {
  const dispatch = useDispatch();
  return (
    <Card title={strings.selectACharacter}>
      <div className={classes.container}>
        <div className={classes.characters}>
          {characters.map((character: string) => (
            <img
              key={character}
              onClick={() => {
                onChange(character);
                dispatch(removeRoute(Route.selectcharacter));
              }}
              className={`${classes.img} ${
                selectedCharacter === character && classes.selected
              }`}
              src={`charicons/${character}.png`}
            ></img>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CharacterSelect;
