import { MouseEventHandler } from "react";
import classes from "./Button.module.scss";

interface Props {
  label?: string;
  type?: "danger";
  onClick?: MouseEventHandler;
  disabled?: boolean;
  icon?: string;
}

const Button: React.FC<Props> = ({ label, type, onClick, disabled, icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${classes.button} ${type === "danger" ? classes.danger : ""}`}
    >
      {icon && <img className={classes.icon} src={icon}></img>}
      {label}
    </button>
  );
};

export default Button;
