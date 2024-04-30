import classes from "./Card.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;
  width?: string;
}

const Card: React.FC<Props> = ({ children, title, width }) => {
  return (
    <div className={classes.container}>
      <div className={classes["header-container"]}>
        <div className={classes.header}>
          <h2 className={classes.title}>{title}</h2>
        </div>
      </div>
      <div
        className={classes.content}
        style={{ maxWidth: "85vw", width: width }}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
