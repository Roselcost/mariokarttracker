import classes from "./Selector.module.scss";

interface Props {
  label?: string;
  options: { id: number | string; name: string; img?: string }[];
  multiple?: boolean;
  all?: boolean;
  selected: {}[];
  onChange: (id: any) => void | {};
  onAll?: () => void | {};
}

const Selector: React.FC<Props> = ({
  label,
  options,
  multiple,
  all,
  selected,
  onChange,
  onAll,
}) => {
  return (
    <div className={classes.options}>
      {all && (
        <button
          onClick={() => onAll && onAll()}
          className={`${classes.label} ${
            selected.length === options.length && classes.checked
          }`}
        >
          All
        </button>
      )}
      {options.map((option) => (
        <div key={option.id}>
          <input
            style={{ display: "none" }}
            type={multiple ? "checkbox" : "radio"}
            id={label + option.name}
            name={label}
            value={option.name}
            checked={selected.includes(option.id)}
            onChange={() => onChange && onChange(option.id)}
          ></input>
          <label
            className={`animate-opacity ${classes.label} ${
              option.img && classes.cover
            }`}
            htmlFor={label + option.name}
          >
            {option.img && <img src={"covers/" + option.img}></img>}

            <div className={option.img && classes["img-label"]}>
              <span>{option.name}</span>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Selector;
