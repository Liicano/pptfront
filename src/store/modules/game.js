import axios from "axios";

export default {
  namespaced: true,
  state: {
    actualPlayers: {
      one: {
        name: "",
        games: {
          won: [],
          lost: [],
        },
      },
      two: {
        name: "",
        games: {
          won: [],
          lost: [],
        },
      },
    },
    game: {
      round: 1,
      rules: {
        rounds: 3,
        objects: [
          {
            name: "piedra",
            kill: ["tijera"],
            killedby: ["papel"],
          },
          {
            name: "papel",
            kill: ["piedra"],
            killedby: ["tijera"],
          },
          {
            name: "tijera",
            kill: ["papel"],
            killedby: ["piedra"],
          },
        ],
      },
      data: {
        winner: {},
        duration: "",
        participants: {
          one: "",
          two: "",
        },
        rounds: [],
      },
    },
  },
  mutations: {
    //   RONDA EN CUESTION
    SET_ROUND(state, payload) {
      state.game.round = payload;
    },
    // NUMERO DE RONDAS DEL JUEGO
    SET_ROUNDS(state, payload) {
      state.game.rules.rounds = payload;
    },
    // OBJECTOS CON LOS CUALES SE VA A JUGAR
    SET_GAME_OBJECTS(state, payload) {
      state.game.rules.objects = payload;
    },
    // REMOVER OBJETO DE JUEGO
    REMOVE_GAME_OBJECT(state, payload) {
      state.game.rules.objects.splice(payload, 1);
    },
    // AGREGA UN OBJETO PARA JUGAR
    ADD_GAME_OBJECT(state, payload) {
      state.game.rules.objects.push(payload);
    },
    // DURACION DE EL JUEGO
    SET_GAME_DURATION(state, payload) {
      state.game.data.duration = payload;
    },
    // PARTICIPANTES DEL JUEGO
    SET_GAME_PARTICIPANTS(state, payload) {
      state.game.data.participants = payload;
    },
    // AGREGAR INFORMACIÓN DE UNA RONDA JUGADA.
    ADD_GAME_ROUND(state, payload) {
      state.game.data.rounds.push(payload);
    },
    // SETEAR EL JUGADOR QUE GANA EL JUEGO
    SET_GAME_WINNER(state, payload) {
      state.game.data.winner = payload;
    },
    // SET JUGADORES ACTUALES
    SET_ACTUAL_PLAYERS(state, payload) {
      state.actualPlayers = payload;
    },

    // LIMPIAR DATA DEL JUEGO
    RESET_GAME(state) {
      state.game.round = 1;
      state.game.rules.rounds = 3;
      state.game.data.rounds = [];
      state.game.rules.objects = [
        {
          name: "piedra",
          kill: ["tijera"],
          killedby: ["papel"],
        },
        {
          name: "papel",
          kill: ["piedra"],
          killedby: ["tijera"],
        },
        {
          name: "tijera",
          kill: ["papel"],
          killedby: ["piedra"],
        },
      ];

      state.actualPlayers = {
        one: {
          name: "",
          games: {
            won: [],
            lost: [],
          },
        },
        two: {
          name: "",
          games: {
            won: [],
            lost: [],
          },
        },
      };
    },
  },
  actions: {
    //   GET - TODOS LOS JUEGOS
    getGames({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000" + "/v1/games?limit=100")
          .then((data) => {
            console.log("GAMES -> ", data);
            resolve(data);
          })
          .catch((err) => {
            reject(err, err.response);
          });
      });
    },
    // GET - JUEGOS DE UN USUARIO ORDENADO EN GANADOS / PERDIDOS
    getUserGames({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000" + "/v1/games/user/" + payload)
          .then((data) => {
            console.log("GAMES OF " + payload + " -> ", data);
            resolve(data.data);
          })
          .catch((err) => {
            reject(err, err.response);
          });
      });
    },
    // GET - USUARIOS QUE HAN JUGADO
    getUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000" + "/v1/games/users")
          .then((data) => {
            console.log("USERS -> ", data);
            resolve(data.data);
          })
          .catch((err) => {
            reject(err, err.response);
          });
      });
    },
    // POST- NUEVO JUEGO
    postGame({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000" + "/v1/games", payload)
          .then((data) => {
            console.log("CREATED GAME -> ", data);
            resolve(data);
          })
          .catch((err) => {
            reject(err, err.response);
          });
      });
    },
  },
  getters: {
    getGame: (state) => state.game,
    getGameData: (state) => state.game.data,
    getGameActualRound: (state) => state.game.round,
    getGameRounds: (state) => state.game.data.rounds,
    getGameRules: (state) => state.game.rules,
    getGameObjects: (state) => state.game.rules.objects,
    getActualPlayers: (state) => state.actualPlayers,
  },
};
