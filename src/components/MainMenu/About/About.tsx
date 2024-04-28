import classes from "./About.module.scss";
import Card from "../../../ui/Card/Card";
import Button from "../../../ui/Button/Button";
import { useDispatch } from "react-redux";
import { Route } from "../../../redux/state";
import { removeRoute } from "../../../redux/store";
import strings from "../../../assets/strings.json";

const About = () => {
  const dispatch = useDispatch();

  return (
    <Card title="About">
      <div className={classes.container}>
        <div className={classes.content}>
          <h2 className={classes.h2}>Description</h2>
          <ul className={classes.text}>
            <li>
              This is a project that came up with my friends while we were
              planning to do all the 96 circuits in Mario Kart 8 Deluxe,
              including all the ones from the Booster Course Pass. Since the
              game doesn't allow to do a 96 circuit cup (and doesn't allow more
              than 4 players on a single Switch), I thought it would be a good
              idea to create a whole app to track the scores of everyone, even
              if we have to take a break and things like that.
            </li>
            <li>
              While it works just as fine, there might be a few errors and
              things that I didn't take into consideration, such as the fact
              that you can create as many profiles as you like, allow more than
              12 players in a single game and so on (upsie 😅). I fixed (almost)
              everything that I could think of, but there might be some things
              that are not fixed yet.
            </li>
            <li>
              With that said, if this app somehow gains popularity, I'll
              definitely fix everything for it to be flawless. But now, for my
              friends and I, it works just as fine 🙂
            </li>
            <li>
              Speaking of which, every other game besides Mario Kart 8 Deluxe +
              DLC is missing. So, right now, if you select a game, no matter
              which one, the available circuits will be from the mentioned game.
            </li>
            <li>
              In the latest game, every character from the main series except 4
              are playable. The ones that are missing are Donkey Kong Jr.,
              Paratroopa, R.O.B and Honey Queen. They can't be selected in this
              app because the icons for the 4 remaining characters wouldn't
              look as nice as the other ones 🥲
            </li>
            <li>
              This is intended to be used with a laptop or a tablet, not with a
              phone, but I did my best 😎
            </li>
            <li>
              If you have any questions or requests, you can{" "}
              <a target="_blank" href="http://twitter.com/roselcost">
                contact me
              </a>{" "}
              and I'll answer as soon as possible.
            </li>
            <li>You can also see my repo in the link below 👇</li>
          </ul>
          <div className={classes.buttons}>
            <Button
              onClick={() =>
                window.open("https://github.com/Roselcost/mariokarttracker")
              }
              icon={"src/assets/utils/github.svg"}
              label="Github"
            ></Button>
          </div>
          <h2 className={classes.h2}>Special thanks</h2>
          <ul className={classes.text}>
            <li>
              Alternative ID Photo art, ideas and support by:{" "}
              <a target="_blank" href="https://twitter.com/TheHalret">
                @TheHalret
              </a>
              ,{" "}
              <a target="_blank" href="https://twitter.com/DrailDe">
                @DrailDe
              </a>
            </li>
            <li>
              Several graphical resources from:{" "}
              <a target="_blank" href="https://www.spriters-resource.com/">
                The Spriters Resource
              </a>
            </li>
          </ul>
        </div>
        <div className={classes.buttons}>
          <Button
            onClick={() => {
              dispatch(removeRoute(Route.about));
            }}
            label={strings.goBack}
          ></Button>
        </div>
      </div>
    </Card>
  );
};

export default About;
