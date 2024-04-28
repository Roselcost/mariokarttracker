import { Circuit } from "../interfaces/Circuit";
import { Player } from "../interfaces/player";

export type State = {
  currentCircuit: number;
  cupName: string;
  game: Game | "";
  totalCircuits: number;
  players: Player[];
  activeRoute: Route[];
  circuits: Circuit[];
  isMobile: boolean;
};

export enum Game {
  supermk = "supermk",
  sixtyfour = "64",
  supercircuit = "supercircuit",
  doubledash = "doubledash",
  ds = "ds",
  wii = "wii",
  seven = "7",
  eight = "8",
  tour = "tour",
  eightdeluxe = "8deluxe",
}

export enum Route {
  main = "main",
  editplayer = "editplayer",
  scores = "scores",
  selectcharacter = "selectcharacter",
  selectcircuit = "selectcircuit",
  summary = "summary",
  gameover = "gameover",
  warning = "warning",
  graph = "graph",
  about = "about"
}

export const allRoutes = [
  { route: Route.main, isDialog: false },
  { route: Route.editplayer, isDialog: true },
  { route: Route.scores, isDialog: false },
  { route: Route.selectcharacter, isDialog: true },
  { route: Route.selectcircuit, isDialog: true },
  { route: Route.summary, isDialog: true },
  { route: Route.gameover, isDialog: true },
  { route: Route.warning, isDialog: true },
  { route: Route.graph, isDialog: true },
  { route: Route.about, isDialog: true },
];
