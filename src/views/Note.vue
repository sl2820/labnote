<template>
  <v-app>
    <div>
      <div class="note-tui">
        <div class="flask flex">
          <input
            type="text"
            class="p-2 mr-2 flex-grow"
            placeholder="New Flask Name"
            v-model="newFlaskName"
            @keyup.enter="createFlask"
          />
        </div>
        <div class="items-start">
          <div
            class="flask"
            v-for="(flask, $flaskIndex) of note.flasks"
            :key="$flaskIndex"
            draggable
            @drop="moveChemicalOrFlask($event, flask.chemicals, $flaskIndex)"
            @dragover.prevent
            @dragenter.prevent
            @dragstart.self="pickupFlask($event, $flaskIndex)"
          >
            <div class="flex mb-2 font-bold">
              <p style="font-size:1rem" class="mr-3">🧪</p>
              {{ flask.name }}
            </div>
            <div class="list-reset">
              <div
                class="chemical"
                v-for="(chemical, $chemicalIndex) of flask.chemicals"
                :key="$chemicalIndex"
                draggable
                @dragstart="pickupChemical($event, $chemicalIndex, $flaskIndex)"
                @click="goToChemical(chemical)"
                @dragover.prevent
                @dragenter.prevent
                @drop.stop="
                  moveChemicalOrFlask(
                    $event,
                    flask.chemicals,
                    $flaskIndex,
                    $chemicalIndex
                  )
                "
              >
                <p
                  class="font-serif italic underline mb-0 text-sm text-gray-600"
                  v-if="chemical.nickname"
                >
                  {{ chemical.nickname }}
                </p>
                <span class="font-bold">
                  {{ chemical.formula }}
                </span>
                <span class="font-medium">
                  {{ chemical.name }}
                </span>
                <span v-if="chemical.product_number" class="font-light">
                  #{{ chemical.product_number }}
                </span>
              </div>

              <input
                type="text"
                class="block p-2 w-full bg-transparent"
                placeholder="+ Enter New Chemical"
                @keyup.enter="createChemical($event, flask.chemicals)"
              />

              <!-- <button
                class="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full"
                @click="createChemical($event, flask.chemicals)"
              >
                Create New!
              </button> -->

              <!-- <div v-if="buttonAuto">
                <v-card>
                  <v-card-text>
                    <v-autocomplete
                      v-model="selectedChemical"
                      :hint="
                        !isEditing
                          ? 'Click the icon to edit'
                          : 'Click the icon to save'
                      "
                      :items="chemical_names"
                      :readonly="!isEditing"
                      :label="
                        `+ Chemical — ${isEditing ? 'Editable' : 'Readonly'}`
                      "
                      persistent-hint
                    >
                      <v-slide-x-reverse-transition
                        slot="append-outer"
                        mode="out-in"
                      >
                        <v-icon
                          :color="isEditing ? 'success' : 'info'"
                          :key="`icon-${isEditing}`"
                          @click="isEditing = !isEditing"
                          v-text="
                            isEditing
                              ? 'mdi-check-outline'
                              : 'mdi-circle-edit-outline'
                          "
                        ></v-icon>
                      </v-slide-x-reverse-transition>
                    </v-autocomplete>
                  </v-card-text>
                </v-card>
              </div> -->
            </div>
          </div>
        </div>

        <div class="chemical-bg" v-if="isChemicalOpen" @click.self="close">
          <router-view />
        </div>
      </div>
      <div class="note-gui"></div>
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex"
import EventService from "@/services/EventService.js"
import { uuid } from "../utils"

export default {
  data() {
    return {
      newFlaskName: "",
      events: [],
      isEditing: false,
      selectedChemical: null,
      chemical_names: [
        "silver nitrate",
        "sodium citrate tribasic dihydrate",
        "trisodium citrate dihydrate",
        "Poly(sodium 4-styrenesulfonate)",
        "PSS",
        "PSSS",
        "sodium borohydride",
        "sodium tetrahydridoborate",
        "ascorbic acid",
        "L-ascorbic acid",
        "vitamin c",
        "Potassium tetrachloropalladate(II)",
        "potassium palladium(II) chloride"
      ]
    }
  },
  computed: {
    ...mapState(["note"]),
    isChemicalOpen() {
      return this.$route.name === "chemical"
    }
  },
  methods: {
    goToChemical(chemical) {
      this.$router.push({ name: "chemical", params: { id: chemical.id } })
    },
    close() {
      this.$router.push({ name: "note" })
    },
    createChemical(e, chemicals) {
      var id = uuid()
      this.$store.commit("CREATE_CHEMICAL", {
        chemicals,
        nickname: e.target.value,
        id: id
      })
      e.target.value = ""
      this.$router.push({ name: "chemical", params: { id: id } })
    },
    createFlask() {
      this.$store.commit("CREATE_FLASK", {
        name: this.newFlaskName
      })
      this.newFlaskName = ""
    },
    pickupChemical(e, chemicalIndex, fromFlaskIndex) {
      e.dataTransfer.effectAllowed = "move"
      e.dataTransfer.dropEffect = "move"

      e.dataTransfer.setData("from-chemical-index", chemicalIndex)
      e.dataTransfer.setData("from-flask-index", fromFlaskIndex)
      e.dataTransfer.setData("type", "chemical")
    },
    pickupFlask(e, fromFlaskIndex) {
      e.dataTransfer.effectAllowed = "move"
      e.dataTransfer.dropEffect = "move"

      e.dataTransfer.setData("from-flask-index", fromFlaskIndex)
      e.dataTransfer.setData("type", "flask")
    },
    moveChemicalOrFlask(e, toChemicals, toFlaskIndex, toChemicalIndex) {
      const type = e.dataTransfer.getData("type")
      if (type === "chemical") {
        this.moveChemical(
          e,
          toChemicals,
          toChemicalIndex !== undefined ? toChemicalIndex : toChemicals.length
        )
      } else {
        this.moveFlask(e, toFlaskIndex)
      }
    },
    moveChemical(e, toChemicals, toChemicalIndex) {
      const fromFlaskIndex = e.dataTransfer.getData("from-flask-index")
      const fromChemicals = this.note.flasks[fromFlaskIndex].chemicals
      const fromChemicalIndex = e.dataTransfer.getData("from-chemical-index")

      this.$store.commit("MOVE_CHEMICAL", {
        fromChemicals,
        fromChemicalIndex,
        toChemicals,
        toChemicalIndex
      })
    },
    moveFlask(e, toFlaskIndex) {
      const fromFlaskIndex = e.dataTransfer.getData("from-flask-index")

      this.$store.commit("MOVE_FLASK", {
        fromFlaskIndex,
        toFlaskIndex
      })
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log("There was an error: " + error.response)
      })
  }
}
</script>

<style lang="css">
.note-tui {
  @apply p-4 bg-gray-200 h-screen w-1/3 overflow-auto inline-block;
}
.flask {
  @apply bg-gray-400 p-2 mb-4 text-left shadow rounded;
}
.chemical {
  @apply items-center bg-gray-500 p-1 pl-4 mb-3 text-left shadow rounded-lg;
}
.chemical-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
.note-gui {
  @apply w-2/3 overflow-auto bg-teal-100 h-screen inline-block;
}
</style>
