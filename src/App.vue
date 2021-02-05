<template>
  <v-app>
    <v-app-bar app color="white ligthen-3" dark>
      <div class="d-flex align-center">
        <v-icon color="black" size="45">mdi-controller-classic</v-icon>
      </div>

      <v-spacer></v-spacer>

      <v-btn text color="green" @click="$router.push('/')">
        Jugar
      </v-btn>

      <v-btn text color="black" @click="$router.push('/reports/users')">
        Jugadores
      </v-btn>
      <v-btn text color="black" @click="$router.push('/reports/games')">
        Registro de juegos
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fill-height fluid>
        <center
          class="mx-12"
          v-if="$route.meta.name && $route.meta.name.length > 0"
        >
          <!-- NOMBRE Y DESCRIPCION DE LOS COMPONENTES DONDE SE ESTA -->
          <h1 class="display-3 font-weight-bold px-8 py-2">
            {{ $route.meta.name }}
          </h1>
          <p class="title">
            {{ $route.meta.description }}
          </p>
        </center>
        <v-row align="center">
          <!-- ===================================== -->
          <!-- VISTAS PRINCIPALES -->
          <!-- ===================================== -->
          <zoom-center-transition :duration="100">
            <router-view></router-view>
          </zoom-center-transition>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ZoomCenterTransition } from 'vue2-transitions'

export default {
  name: 'App',

  components: {
    ZoomCenterTransition,
  },

  data: () => ({
    //
  }),
}
</script>
