<template>
  <div class="games">
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
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar juego"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="games"
            :search="search"
            max="100"
            :items-per-page="100"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'gamesStats',
  components: {},
  data: () => {
    return {
      loading: false,
      gamesRecord: [],
      search: '',
      headers: [
        {
          text: 'ID del juego',
          align: 'start',
          filterable: true,
          value: 'id',
        },
        { text: 'Ganador', value: 'winner' },
        { text: 'Perdedor', value: 'loser' },
        { text: 'Rondas', value: 'rounds' },
      ],
      games: [],
    }
  },
  methods: {
    ...mapActions({
      getGames: 'game/getGames',
    }),
  },
  async mounted() {
    this.loading = true
    this.gamesRecord = await this.getGames()

    this.games = this.gamesRecord.data.results.map((gr) => {
      return {
        id: gr.id,
        winner: gr.data.winner,
        loser:
          gr.data.participants.one == gr.data.winner
            ? gr.data.participants.two
            : gr.data.participants.one,
        rounds: gr.rules.rounds,
      }
    })
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
