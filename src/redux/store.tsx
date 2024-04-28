import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Player } from "../interfaces/player";
import { Route, State, allRoutes } from "./state";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const isMobile = window.innerWidth <= 700;

const initialState: State = {
  cupName: "",
  game: "",
  totalCircuits: 0,
  currentCircuit: 0,
  activeRoute: [Route.main],
  players: [],
  circuits: [
    {
      id: 0,
      name: "",
      scores: [],
    },
  ],
  isMobile,
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setCurrentRoute: (state, value: { payload: Route }) => {
      const isDialog =
        allRoutes.find((route) => route.route === value.payload)?.isDialog ??
        false;

      document.body.style.overflow = isDialog ? "hidden" : "";
      state.activeRoute.push(value.payload);
    },

    setCupName: (state, value) => {
      state.cupName = value.payload;
    },
    setSelectedPlayer: (state, value) => {
      const selectedPlayer = state.players.find(
        (player) => player.id === value.payload
      );
      if (selectedPlayer) selectedPlayer.isSelected = true;
    },
    setPlayerStatus: (state, value) => {
      const player = state.players.find(
        (player) => player.id === value.payload
      );
      if (player) player.isPlaying = !player.isPlaying;
    },
    setAllPlayersStatus: (state) => {
      const select =
        state.players.length !==
        state.players.filter((player) => player.isPlaying).length;
      state.players.forEach((player) => (player.isPlaying = select));
    },
    setGame: (state, value) => {
      state.game = value.payload;
    },
    setCircuits: (state, value) => {
      state.totalCircuits = value.payload;
    },
    setCurrentCircuitName: (state, value) => {
      const circuitIndex = state.circuits.findIndex(
        (circuit) => circuit.id == value.payload.currentCircuit
      );
      state.circuits[circuitIndex].name = value.payload.circuitName;
    },
    newGame: (state) => {
      state.cupName = "";
      state.game = "";
      state.totalCircuits = 0;
      state.currentCircuit = 0;
      state.circuits = [{ id: 0, name: "", scores: [] }];
      state.isMobile = isMobile;
    },

    removeRoute: (state, value: { payload: Route }) => {
      if (state.activeRoute[state.activeRoute.length - 1] === value.payload) {
        state.activeRoute = state.activeRoute.filter(
          (route) => route !== value.payload
        );

        const routesWithDialog = allRoutes
          .filter((route) => route.isDialog)
          .map((route) => route.route);

        const hasDialog = state.activeRoute.some((route) =>
          routesWithDialog.includes(route)
        );

        document.body.style.overflow = hasDialog ? "hidden" : "";
        if (value.payload === Route.editplayer) {
          state.players.forEach((player) => (player.isSelected = false));
        }
      }
    },
    deletePlayer: (state, value) => {
      const index = state.players.findIndex(
        (player) => player.id == value.payload
      );
      state.players.splice(index, 1);
    },
    setPlayer: (state, value: { payload: Player }) => {
      const updatedPlayer: Player = {
        ...value.payload,
        isPlaying: value.payload.id === 0 ? true : value.payload.isPlaying,
        id:
          value.payload.id === 0
            ? state.players
                .map((player) => player.id)
                .reduce((acum, current) => {
                  return Math.max(current + 1, acum);
                }, 1)
            : value.payload.id,
      };

      if (value.payload.id === 0) {
        state.players.push(updatedPlayer);
      } else {
        const index = state.players.findIndex(
          (player) => player.id == updatedPlayer.id
        );
        state.players[index] = updatedPlayer;
      }
    },
    setCircuit: (state, value) => {
      state.currentCircuit += value.payload;
      !state.circuits[state.currentCircuit] &&
        state.circuits.push({
          id: state.currentCircuit,
          name: "",
          scores: [],
        });
    },
    setScores: (state, value) => {
      const index = state.circuits.findIndex(
        (circuit) => circuit.id == state.currentCircuit
      );
      state.circuits[index].scores = value.payload;
    },
    setIsMobile: (state, value) => {
      state.isMobile = value.payload;
    },
  },
});

export const {
  setCurrentRoute,
  setIsMobile,
  removeRoute,
  setPlayer,
  deletePlayer,
  setCupName,
  setPlayerStatus,
  setGame,
  setCircuits,
  setCircuit,
  setAllPlayersStatus,
  setCurrentCircuitName,
  setScores,
  setSelectedPlayer,
  newGame,
} = stateSlice.actions;

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, stateSlice.reducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);
