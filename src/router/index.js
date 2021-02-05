import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "GameWelcome",
    redirect: {
      name: "Config",
    },
    component: () =>
      import(/* webpackChunkName: "GameWelcome" */ "../views/game/ppt.vue"),
    children: [
      {
        path: "/start",
        name: "Jugadores",
        meta: {
          name: "Jugadores",
          description:
            "Si jugar quieren, colocar sus usernames deben... *Inserte voz de yoda*. Coloca un username singular, algo que nadie pueda usar.",
          showScore: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "GameWelcome" */ "../components/game/start.vue"
          ),
      },
      {
        path: "/config",
        name: "Config",
        meta: {
          name: "Bienvenido",
          description:
            "Bienvenido a (PIEDRA PAPEL O TIJERAS CON ESTEROIDES), Inicia configurando los objetos con los cuales jugaras, asi como el numero de rondas a jugar.",
          showScore: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "GameWelcome" */ "../components/game/config.vue"
          ),
      },
      {
        path: "/play",
        name: "Play",
        meta: {
          name: "",
          description: "",
          showScore: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "GameWelcome" */ "../components/game/rounds.vue"
          ),
      },
    ],
  },
  {
    path: "/reports/games",
    name: "ReporteJuegos",
    meta: {
      name: "",
      description: "",
      showScore: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "GameWelcome" */ "../components/reports/games.vue"
      ),
  },
  {
    path: "/reports/users",
    name: "ReporteUsuarios",
    meta: {
      name: "",
      description: "",
      showScore: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "GameWelcome" */ "../components/reports/users.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
