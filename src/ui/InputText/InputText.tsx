import { useState } from "react";
import classes from "./InputText.module.scss";

interface Props {
  label?: string;
  value?: string | number;
  onChange?: (value: any) => void | {};
  min?: number;
  max?: number;
  special?: boolean;
}

const InputText: React.FC<Props> = ({
  label,
  value = "",
  onChange,
  special,
  min,
  max,
}) => {
  const [state, setState] = useState(value);

  return (
    <div className={classes.content}>
      <input
        value={state}
        name={label}
        onChange={(e) => {
          let val: string | number = e.target.value;
          if (!!min && !!max) {
            if (val !== "") {
              val = parseInt(val);
              if (Number.isNaN(val)) val = "";
              else if (val < min) val = min;
              else if (val > max) val = max;
            }
          }
          setState(val);
          onChange && onChange(val);
        }}
        className={`${classes.input} ${special && classes["current-position"]}`}
        type="text"
      ></input>
    </div>
  );
};

export default InputText;
