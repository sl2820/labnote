<template>
  <div>
    <div class="note-tui">
      <div class="items-start">
        <AppButton class="mx-2 my-5 bg-teal-500" @click="createChemical"
          >Create Chemical</AppButton
        >
        <AppButton class="bg-indigo-500" @click="createProcess"
          >Create Process</AppButton
        >
        <div
          class="chemical"
          v-for="(chemical, $chemicalIndex) in note.components"
          :key="$chemicalIndex"
          draggable
          @drop="moveChemical($event, $chemicalIndex)"
          @dragover.prevent
          @dragenter.prevent
          @dragstart.self="pickupChemical($event, $chemicalIndex)"
          @click="openChemical(chemical)"
        >
          <AppChemical :chemical="chemical" :chemicalIndex="$chemicalIndex" />
        </div>
      </div>

      <div
        class="chemical-bg"
        v-if="isChemicalOpen"
        @click.self="closeChemical"
      >
        <router-view />
      </div>
    </div>
    <div class="note-gui"></div>
  </div>
</template>

<script>
import { mapState } from "vuex"
// import { uuid } from "@/utils"
import AppButton from "@/components/AppButton"
import AppChemical from "@/components/AppChemical"

export default {
  components: { AppButton, AppChemical },
  data() {
    return {}
  },
  computed: {
    ...mapState(["note"]),
    isChemicalOpen() {
      return this.$route.name === "chemical"
    }
  },
  methods: {
    createChemical() {},
    createProcess() {},
    moveChemical(e, toChemicalIndex) {
      const fromChemicalIndex = e.dataTransfer.getData("from-chemical-index")

      this.$store.commit("MOVE_CHEMICAL", {
        fromChemicalIndex,
        toChemicalIndex
      })
    },
    pickupChemical(e, fromChemicalIndex) {
      e.dataTransfer.effectAllowed = "move"
      e.dataTransfer.dropEffect = "move"

      e.dataTransfer.setData("from-chemical-index", fromChemicalIndex)
      e.dataTransfer.setData("type", "flask")
    },
    openChemical(chemical) {
      this.$router.push({ name: "chemical", params: { id: chemical.id } })
    },
    closeChemical() {
      this.$router.push({ name: "note" })
    }
  }
}
</script>

<style lang="css">
.note-tui {
  @apply p-4 bg-gray-100 h-screen w-2/5 overflow-auto inline-block;
}
.chemical {
  @apply bg-teal-100 p-3 mb-4 text-left shadow rounded;
}
.chemical-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
.note-gui {
  @apply w-3/5 overflow-auto bg-gray-300 h-screen inline-block;
}
</style>
