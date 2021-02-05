<template>
  <div class="start">
    <v-row>
      <v-col>
        <center>
          <p class="title font-weight-bold">PIEDRA, PAPEL O TIJERAS.</p>
          <v-avatar color="green" size="150">
            <v-icon size="120" color="white">mdi-google-controller</v-icon>
          </v-avatar>
        </center>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col lg="6" xl="6" md="12" sm="12">
        <center>
          <v-icon size="100">mdi-numeric-1-circle</v-icon>
          <p class="display-1">Jugador</p>
          <v-text-field
            label="Nombre de usuario"
            class="recortedInput"
            color="green"
            outlined
            v-model="player_one.name"
          ></v-text-field>
        </center>
      </v-col>
      <v-col lg="6" xl="6" md="12" sm="12">
        <center>
          <v-icon size="100">mdi-numeric-2-circle</v-icon>
          <p class="display-1">Jugador</p>
          <v-text-field
            label="Nombre de usuario"
            class="recortedInput"
            color="green"
            outlined
            v-model="player_two.name"
          ></v-text-field>
        </center>
      </v-col>
    </v-row>
    <v-divider class="py-2 px-4"></v-divider>
    <v-row class="mx-16">
      <v-col cols="12">
        <center>
          <v-btn
            rounded
            large
            class="white--text"
            color="green"
            block
            :disabled="
              player_one.name.length == 0 ||
              player_two.name.length == 0 ||
              loading
            "
            :loading="loading"
            @click="goPlay()"
          >
            Empezar juego
          </v-btn>
        </center>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'gameStartComponent',
  components: {},
  data: () => {
    return {
      loading: false,
      player_one: {
        name: '',
      },
      player_two: {
        name: '',
      },
    }
  },
  methods: {
    ...mapActions({
      getUserGames: 'game/getUserGames',
    }),
    ...mapMutations({
      setGameParticipants: 'game/SET_GAME_PARTICIPANTS',
      setGameRound: 'game/SET_ROUND',
      setActualPlayers: 'game/SET_ACTUAL_PLAYERS',
    }),

    async goPlay() {
      this.loading = true
      // PARTICIPANTES DEL JUEGO
      this.setGameParticipants({
        one: this.player_one.name,
        two: this.player_two.name,
      })
      //  ROUND DEL JUEGO
      this.setGameRound(1)
      let player_one_games = await this.getUserGames(this.player_one.name)
      let player_two_games = await this.getUserGames(this.player_two.name)

      this.setActualPlayers({
        one: {
          name: this.player_one.name,
          games: {
            won: player_one_games.won,
            lost: player_one_games.lost,
          },
        },
        two: {
          name: this.player_two.name,
          games: {
            won: player_two_games.won,
            lost: player_two_games.lost,
          },
        },
      })
      this.loading = false
      this.$router.push('/play')
    },
  },
  computed: {
    ...mapGetters({
      getGame: 'game/getGame',
    }),
  },
}
</script>
<style>
.start {
  width: 100% !important;
  height: 100% !important;
}
.recortedInput {
  width: 40%;
}
</style>
