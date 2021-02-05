<template>
  <div class="config">
    <!-- NEW RULE DIALOG -->
    <v-dialog v-model="newRuleDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Agregar nuevo objeto al juego</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="newObject.name"
                  label="Nombre"
                  color="green"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="newObject.kill"
                  :items="getGameRules.objects"
                  item-text="name"
                  item-value="name"
                  label="Le gana a"
                  single-line
                  color="green"
                  multiple
                  @change="setKilledBy()"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-subheader class="red--text">Pierde con</v-subheader>
                <center
                  v-if="newObject.killedby && newObject.killedby.length > 0"
                >
                  <span
                    v-for="nok in newObject.killedby"
                    :key="nok"
                    class="caption"
                  >
                    {{ nok }}
                  </span>
                </center>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text>
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            :disabled="newObject.killedby.length == 0"
            @click="addNewObject()"
          >
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col>
        <center>
          <p class="title font-weight-bold">Reglas del juego</p>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    OBJECTO
                  </th>
                  <th class="text-center red--text">
                    PIERDE CON
                  </th>
                  <th class="text-center green--text">
                    LE GANA A
                  </th>
                  <th>
                    <center>
                      Descartar
                    </center>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ro in getGameRules.objects" :key="ro.name">
                  <td class="text-center">{{ ro.name.toUpperCase() }}</td>
                  <td class="text-center">
                    <p v-for="kb in ro.killedby" :key="kb">
                      {{ kb.toUpperCase() }}
                    </p>
                  </td>
                  <td class="text-center">
                    <p v-for="k in ro.kill" :key="k">{{ k.toUpperCase() }}</p>
                  </td>
                  <td>
                    <center>
                      <v-btn icon color="red" @click="removeObject(ro)">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </center>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-btn
            class="my-2"
            fab
            dark
            large
            color="green"
            @click="openNewObjectDialog()"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
          <p class="caption">Nuevo objeto</p>
        </center>
      </v-col>
      <v-col>
        <center>
          <p class="title font-weight-bold">Numero de rondas</p>

          <v-text-field
            class="recortedInput"
            placeholder="#"
            color="green"
            outlined
            v-model="rules.rounds"
          ></v-text-field>

          <br />
          <p class="caption red--text" v-if="rules.rounds % 2 ? false : true">
            Un numero de rondas par no tiene ganador jeje
          </p>
        </center>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <center>
          <v-btn
            large
            color="green"
            class="white--text"
            :disabled="
              (rules.rounds % 2 ? false : true) ||
              getGameRules.objects.length <= 2
            "
            @click="goToPlay()"
          >
            Continuar
          </v-btn>
        </center>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'gameConfig',
  components: {},
  data: () => {
    return {
      newRuleDialog: false,
      newObject: {
        name: [],
        kill: [],
        killedby: [],
      },
      rules: {
        rounds: 3,
      },
    }
  },

  methods: {
    ...mapMutations({
      addGameObject: 'game/ADD_GAME_OBJECT',
      setGameRounds: 'game/SET_ROUNDS',
      removeGameObject: 'game/REMOVE_GAME_OBJECT',
    }),
    removeObject(o) {
      let i = this.getGameRules.objects.findIndex((ro) => ro.name == o.name)
      this.removeGameObject(i)
    },

    setKilledBy() {
      // BUSCA Y RETORNA LOS OBJETOS NO SELECCIONADOS
      const loseWith = this.getGameRules.objects.filter(
        (n) => !this.newObject.kill.some((o) => o === n.name),
      )

      //  MAPEA Y RETORNA LOS NOMBRES
      this.newObject.killedby = loseWith.map((lw) => lw.name)
    },
    addNewObject() {
      this.addGameObject(this.newObject)
      this.newRuleDialog = false
    },
    openNewObjectDialog() {
      this.newObject = {
        name: [],
        kill: [],
        killedby: [],
      }
      this.newRuleDialog = true
    },
    goToPlay() {
      this.$router.push('/start')
      this.setGameRounds(this.rules.rounds)
      console.warn(this.getGameRules)
    },
  },
  computed: {
    ...mapGetters({
      getGameRules: 'game/getGameRules',
      getGameData: 'game/getGameData',
    }),
  },
  watch: {},
}
</script>
<style>
.config {
  width: 100% !important;
  height: 100% !important;
}
.recortedInput {
  width: 40%;
}
</style>
