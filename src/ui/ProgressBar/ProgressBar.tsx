import classes from "./ProgressBar.module.scss";

interface Props {
  value: number;
  maxValue: number;
}

const ProgressBar: React.FC<Props> = ({ value, maxValue }) => {
  return (
    <div className={classes["progress-bar"]}>
      <div
        style={{
          width: `calc((${value} / ${maxValue}) * 100%)`,
        }}
        className={classes.progress}
      ></div>
    </div>
  );
};

export default ProgressBar;
