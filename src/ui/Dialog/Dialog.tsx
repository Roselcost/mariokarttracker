import { useEffect } from "react";
import classes from "./Dialog.module.scss";

interface Props {
  onClick: () => void | {};
  children: React.ReactNode;
}

const Dialog: React.FC<Props> = ({ children, onClick }) => {
  useEffect(() => {
    const handleEsc = (event: { key: string }) => {
      if (event.key === "Escape") {
        onClick();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClick]);

  return (
    <div className={`${classes.container}`}>
      <div
        onClick={() => onClick()}
        className={`${classes.overlay} animate-opacity`}
      ></div>
      <div className={`${classes.content} animate-up`}>{children}</div>
    </div>
  );
};

export default Dialog;
