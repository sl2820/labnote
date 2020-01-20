<template>
  <div class="note">
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
          <p style="font-size:1rem">🧪</p>
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
            <span class="font-bold">
              {{ chemical.chemical_formula }}
            </span>
            <span class="italic">
              {{ chemical.name }}
            </span>
            <p v-if="chemical.description" class="text-sm">
              {{ chemical.description }}
            </p>
          </div>

          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter New Chemical"
            @keyup.enter="createChemical($event, flask.chemicals)"
          />
        </div>
      </div>
    </div>

    <div class="chemical-bg" v-if="isChemicalOpen" @click.self="close">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
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
      this.$store.commit("CREATE_CHEMICAL", {
        chemicals,
        name: e.target.value
      })
      e.target.value = ""
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
  }
}
</script>

<style lang="css">
.note {
  @apply p-4 bg-gray-200 h-screen w-1/3 overflow-auto;
}
.flask {
  @apply bg-gray-400 p-2 mb-4 text-left shadow rounded;
}
.chemical {
  @apply items-center bg-gray-500 p-1 mb-3 text-left shadow rounded;
}
.chemical-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
