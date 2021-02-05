<template>
  <div class="games">
    <!-- DIALOGO DE DETALLE DE USUARIO -->
    <v-dialog v-model="userDetailsDialog" width="500">
      <v-card v-if="loadingUser">
        <v-card-text>
          <v-row>
            <v-col>
              <center>
                <v-progress-circular
                  :size="80"
                  :width="15"
                  color="green"
                  indeterminate
                ></v-progress-circular>
              </center>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-title class="headline green lighten-2">
          {{ user.name }}
        </v-card-title>

        <v-card-text>
          <v-list-item three-line>
            <v-list-item-content class="font-weight-bold">
              <v-list-item-title>
                {{ user.stats.total }} JUEGOS
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ user.stats.won.length }}
                <span class="green--text">Ganados</span>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ user.stats.lost.length }}
                <span class="red--text">Perdidos</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <br />
          <v-container>
            <GChart
              type="ColumnChart"
              :data="chartData"
              :options="chartOptions"
            />
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="userDetailsDialog = false">
            SALIR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row
      v-if="loading"
      align="center"
      justify="center"
      width="100%"
      height="100%"
      class="px-4"
    >
      <v-col cols="12" width="100%" height="100%">
        <center>
          <v-progress-circular
            :size="160"
            :width="30"
            color="green"
            indeterminate
          ></v-progress-circular>
        </center>
      </v-col>
    </v-row>

    <v-row
      v-else
      align="center"
      justify="center"
      width="100%"
      height="100%"
      class="px-4"
    >
      <v-col cols="12" width="100%" height="100%" class="roundedCard">
        <v-card class="mx-auto" max-width="500" rounded="">
          <v-toolbar color="green" dark>
            <v-toolbar-title>Listado de jugadores</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list subheader>
            <v-subheader>Seleccion un jugador</v-subheader>
            <v-list-item
              v-for="u in usersRecords.allUsers"
              :key="u"
              @click="selectUser(u)"
            >
              <v-list-item-avatar>
                <v-avatar size="50">
                  <v-icon size="40">
                    mdi-account-circle
                  </v-icon>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="u"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon color="green">
                  mdi-arrow-right
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GChart } from 'vue-google-charts'

export default {
  name: 'gameUsers',
  components: { GChart },
  data: () => {
    return {
      userDetailsDialog: false,
      user: {
        name: '',
        stats: {},
      },
      loadingUser: true,
      loading: false,
      usersRecords: [],
      chartData: [],
      chartOptions: {
        chart: {
          title: 'Rendimiento del jugador',
          subtitle: '',
        },
      },
    }
  },
  methods: {
    ...mapActions({
      getUsers: 'game/getUsers',
      getUserGames: 'game/getUserGames',
    }),
    async selectUser(u) {
      this.loadingUser = true
      this.userDetailsDialog = true

      this.user.name = u
      this.user.stats = await this.getUserGames(u)
      this.fillChart()
      this.loadingUser = false
    },
    fillChart() {
      this.chartData = [
        ['Total', 'Ganados', 'Perdidos'],
        [
          this.user.stats.total,
          this.user.stats.won.length,
          this.user.stats.lost.length,
        ],
      ]
    },
  },
  async mounted() {
    this.loading = true
    this.usersRecords = await this.getUsers()
    this.loading = false
  },
  computed: {},
}
</script>
<style>
.games {
  width: 100% !important;
  height: 100% !important;
}
.roundedCard {
  border-radius: 15px !important;
}
</style>
