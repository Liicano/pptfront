<template>
  <div class="game py-10 px-10">
    <v-row align="center" justify="center" width="100%" height="100%">
      <v-col>
        <v-card width="100%" height="100%" class="roundedCard">
          <v-app-bar color="#ff6226" dense dark>
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-card-text>
            <v-row v-if="$route.meta.showScore">
              <v-col class="text-left">
                <p class="display-1 text--primary">
                  PUNTAJE
                </p>
              </v-col>
              <v-col class="text-right">
                <v-row class="text-right">
                  <v-col class="text-right">
                    <div>
                      <p class="subtitle-1 text--primary">
                        {{ getActualPlayers.one.name }}
                      </p>
                      <div class="caption sub">
                        <span class="green--text">Juegos ganados:</span>
                        <span class="font-weight-bold">
                          {{ getActualPlayers.one.games.won.length }}
                        </span>
                      </div>
                      <br />
                      <div class="caption sub">
                        <span class="red--text">Juegos perdidos:</span>
                        <span class="font-weight-bold">
                          {{ getActualPlayers.one.games.lost.length }}
                        </span>
                      </div>
                    </div>
                  </v-col>
                  <v-divider vertical inset></v-divider>
                  <v-col class="text-right rightPos">
                    <div>
                      <p class="subtitle-1 text--primary">
                        {{ getActualPlayers.two.name }}
                      </p>
                      <div class="caption sub">
                        <span class="green--text">Juegos ganados:</span>
                        <span class="font-weight-bold">
                          {{ getActualPlayers.two.games.won.length }}
                        </span>
                      </div>
                      <br />
                      <div class="caption sub">
                        <span class="red--text">Juegos perdidos:</span>
                        <span class="font-weight-bold">
                          {{ getActualPlayers.two.games.lost.length }}
                        </span>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <!-- ===================================== -->
            <!-- VISTAS DENTRO DE LA CARTA CENTRAL -->
            <!-- ===================================== -->

            <v-row class="py-4">
              <v-col>
                <zoom-center-transition :duration="100">
                  <router-view></router-view>
                </zoom-center-transition>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ZoomCenterTransition } from 'vue2-transitions'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'gameBegin',
  components: {
    ZoomCenterTransition,
  },
  methods: {},
  computed: {
    ...mapGetters({
      getActualPlayers: 'game/getActualPlayers',
    }),
  },
}
</script>
<style>
.game {
  width: 100% !important;
  height: 100% !important;
}
.roundedCard {
  border-radius: 15px !important;
}
.sub {
  margin-top: -20px;
}
.rightPos {
  max-width: 100%;
  width: 100% !important;
}
</style>
