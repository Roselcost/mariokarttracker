import Button from "../../../ui/Button/Button";
import Card from "../../../ui/Card/Card";
import classes from "./Graph.module.scss";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import strings from "../../../assets/strings.json";
import { useDispatch } from "react-redux";
import { removeRoute } from "../../../redux/store";
import { Route } from "../../../redux/state";

interface Props {
  data: any[];
}

const setStroke = (index: number) => {
  const red = "#871010";
  const blue = "#0a619e";
  const green = "#168710";
  const yellow = "#b2a907";
  const orange = "#b25c07";
  const purple = "#8884d8";
  let stroke = purple;
  switch (index % 6) {
    case 0:
      stroke = red;
      break;
    case 1:
      stroke = blue;
      break;
    case 2:
      stroke = green;
      break;
    case 3:
      stroke = yellow;
      break;
    case 4:
      stroke = orange;
      break;
    default:
      stroke = purple;
      break;
  }
  return stroke;
};

const Graph: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Card title={"Graph"}>
        <div className={classes.container}>
          <div className={classes.content}>
            <LineChart width={1100} height={400} data={data}>
              {Object.getOwnPropertyNames(data[0]).map(
                (property, index) =>
                  !["name"].includes(property) && (
                    <Line
                      key={property}
                      type="monotone"
                      dataKey={property}
                      stroke={setStroke(index)}
                    />
                  )
              )}
              <CartesianGrid stroke="var(--grey)" strokeDasharray="" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  border: "1px solid var(--grey)",
                  borderRadius: "8px",
                  backgroundImage: "radial-gradient(at top, #222, #050505",
                  padding: "20px",
                }}
                labelClassName={classes.label}
              />
            </LineChart>
          </div>
          <div className={classes.center}>
            <Button
              onClick={() => dispatch(removeRoute(Route.graph))}
              label={strings.goBack}
            ></Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Graph;
