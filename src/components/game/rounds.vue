<template>
  <div class="round">
    <v-row>
      <v-col>
        <center>
          <p class="display-1 font-weight-black">
            Jugando la ronda # {{ getGameActualRound }}
          </p>
        </center>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <center>
          <p class="display-1 font-weight-bold">
            Turno de {{ actualMovement.user }}
          </p>

          <v-select
            class="recortedSelect"
            @change="changeMovement($event)"
            :items="getGameObjects"
            item-text="name"
            item.value="name"
            attach
            chips
            label="Seleccionar jugada"
            ref="moveSelect"
          ></v-select>
          <br />
          <v-btn
            large
            color="green"
            class="white--text"
            @click="userMove()"
            :disabled="(actualMovement.move == '')"
          >
            ok
          </v-btn>
        </center>
      </v-col>
      <v-col v-if="getGameActualRound > 1">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Round
                </th>
                <th class="text-left">
                  Ganador
                </th>
                <th class="text-left">
                  Objeto utilizado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="gr in getGameRounds" :key="gr.round">
                <td>{{ gr.round }}</td>
                <td>{{ gr.winner.name }}</td>
                <td>{{ gr.winner.movement }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'gameRound',
  components: {},
  data: () => {
    return {
      value: ['foo'],
      actualMovement: {
        user: '',
        move: '',
        userNumber: 'one',
      },
      roundMovements: {
        one: {},
        two: {},
      },
    }
  },
  mounted() {
    this.actualMovement.user = this.getGame.data.participants.one
  },
  methods: {
    ...mapMutations({
      addGameRound: 'game/ADD_GAME_ROUND',
      setRound: 'game/SET_ROUND',
      resetGame: 'game/RESET_GAME',
      setGameWinner: 'game/SET_GAME_WINNER',
    }),
    ...mapActions({
      postGame: 'game/postGame',
    }),
    userMove() {
      // INGRESA MOVIMIENTO AL LISTADO
      this.roundMovements[this.actualMovement.userNumber] = {
        user: this.actualMovement.user,
        move: this.actualMovement.move,
      }

      // CAMBIA DE JUGADOR
      this.changePlayer()
    },
    changePlayer() {
      // RESET DEL V-SELECT
      this.$refs.moveSelect.reset()

      if (this.actualMovement.userNumber == 'two') {
        if (this.roundMovements.one.move == this.roundMovements.two.move) {
          // EMPATE
          this.tie()
        } else {
          // CIERRA LA RONDA
          this.closeRound()
        }
      } else {
        this.actualMovement.user =
          this.actualMovement.user == this.getGame.data.participants.one
            ? this.getGame.data.participants.two
            : this.getGame.data.participants.one

        this.actualMovement.userNumber =
          this.actualMovement.userNumber == 'one' ? 'two' : 'one'
      }
    },
    changeMovement(e) {
      this.actualMovement.move = e
    },
    closeRound() {
      this.actualMovement.user = this.getGame.data.participants.one
      this.actualMovement.userNumber = 'one'

      this.compareMoves()
    },
    compareMoves() {
      let obj = this.getGameObjects.find(
        (go) => go.name == this.roundMovements.one.move,
      )

      let oneIsWinner = obj.kill.find(
        (gob) => gob === this.roundMovements.two.move,
      )
        ? true
        : false

      // GUARDANDO DATA DE LA RONDA
      this.addGameRound({
        round: this.getGameActualRound,
        roundDuration: '',
        winner: {
          name: oneIsWinner
            ? this.roundMovements.one.user
            : this.roundMovements.two.user,
          movement: oneIsWinner
            ? this.roundMovements.one.move
            : this.roundMovements.two.move,
        },
        loser: {
          name: oneIsWinner
            ? this.roundMovements.two.user
            : this.roundMovements.one.user,
          movement: oneIsWinner
            ? this.roundMovements.two.move
            : this.roundMovements.one.move,
        },
      })

      let nextRound = this.getGameActualRound + 1
      this.setRound(nextRound)

      // RECONOCE QUE EL ROUND SEA EL ULTIMO
      if (this.getGameActualRound > this.getGame.rules.rounds) {
        this.getGameWinner()
      }
    },

    getGameWinner() {
      let winnerData = this.getGameRounds
        .map((gr) => gr.winner.name)
        .filter(((s) => (v) => s.has(v) || !s.add(v))(new Set()))

      this.setGameWinner(winnerData[0])
      Swal.fire({
        title: 'GANADOR: ' + winnerData[0],
        icon: 'success',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: `REPETIR JUEGO`,
        confirmButtonColor: 'green',
      }).then((result) => {
        if (result.isConfirmed) {
          this.finalizeGame()
        }
      })
    },
    async finalizeGame() {
      const finalResult = this.getGame
      await this.postGame(finalResult)

      this.resetGame()
      this.$router.push('/')
    },

    tie() {
      this.actualMovement.user = this.getGame.data.participants.one
      this.actualMovement.userNumber = 'one'

      Swal.fire({
        title: '¡EMPATE!, Se repite la ronda.',
        icon: 'success',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: `OK`,
        confirmButtonColor: 'green',
      }).then((result) => {
        if (result.isConfirmed) {
        }
      })
    },
  },
  computed: {
    ...mapGetters({
      getGame: 'game/getGame',
      getGameObjects: 'game/getGameObjects',
      getGameActualRound: 'game/getGameActualRound',
      getGameRounds: 'game/getGameRounds',
    }),
  },
}
</script>
<style>
.rounds {
  width: 100% !important;
  height: 100% !important;
}

.recortedSelect {
  width: 50% !important;
}
</style>
