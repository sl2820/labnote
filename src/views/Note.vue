<template>
  <div>
    <div class="note-tui">
      <div class="items-start">
        <AppButton
          class="mx-3 mb-5 bg-teal-500 rounded-sm"
          @click="createChemical"
          >Create Chemical</AppButton
        >
        <AppButton
          class="mx-3 mb-5 bg-indigo-500 rounded-full"
          @click="createProcess"
          >Create Process</AppButton
        >
        <div
          class="chemical"
          v-for="(chemical, $chemicalIndex) in note.components"
          :key="$chemicalIndex + '-chemical'"
          draggable
          @drop="moveChemical($event, $chemicalIndex)"
          @dragover.prevent
          @dragenter.prevent
          @dragstart.self="pickupChemical($event, $chemicalIndex)"
          @click="openChemical(chemical)"
        >
          <AppChemical :chemical="chemical" :chemicalIndex="$chemicalIndex" />
        </div>

        <div
          class="process"
          v-for="(process, $processIndex) in note.actions"
          :key="$processIndex + '-process'"
          draggable
          @drop="moveProcess($event, $processIndex)"
          @dragover.prevent
          @dragenter.prevent
          @dragstart.self="pickupProcess($event, $processIndex)"
          @click="openProcess(process)"
        >
          <AppProcess :process="process" :processIndex="$processIndex" />
        </div>
      </div>

      <div
        class="chemical-bg"
        v-if="isChemicalOpen"
        @click.self="closeChemicalProcess"
      >
        <router-view />
      </div>
      <div
        class="process-bg"
        v-if="isProcessOpen"
        @click.self="closeChemicalProcess"
      >
        <router-view />
      </div>
    </div>
    <div class="note-gui">
      <AppPipeline />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
// import { uuid } from "@/utils"
import AppButton from "@/components/AppButton"
import AppChemical from "@/components/AppChemical"
import AppProcess from "@/components/AppProcess"
import AppPipeline from "@/components/AppPipeline"

export default {
  components: { AppButton, AppChemical, AppProcess, AppPipeline },
  data() {
    return {}
  },
  computed: {
    ...mapState(["note"]),
    isChemicalOpen() {
      return this.$route.name === "chemical"
    },
    isProcessOpen() {
      return this.$route.name === "process"
    }
  },
  methods: {
    createChemical() {},
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
      // e.dataTransfer.setData("type", "flask")
    },
    openChemical(chemical) {
      this.$router.push({ name: "chemical", params: { id: chemical.id } })
    },

    createProcess() {},
    moveProcess(e, toProcessIndex) {
      const fromProcessIndex = e.dataTransfer.getData("from-process-index")
      this.$store.commit("MOVE_PROCESS", {
        fromProcessIndex,
        toProcessIndex
      })
    },
    pickupProcess(e, fromProcessIndex) {
      e.dataTransfer.effectAllowed = "move"
      e.dataTransfer.dropEffect = "move"
      e.dataTransfer.setData("from-process-index", fromProcessIndex)
      // e.dataTransfer.setData("type", "flask")
    },
    openProcess(process) {
      this.$router.push({ name: "process", params: { id: process.id } })
    },

    closeChemicalProcess() {
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
  @apply bg-teal-200 p-3 mb-4 text-left shadow-md rounded-sm;
}
.chemical-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
.process {
  @apply bg-indigo-200 p-3 mb-4 text-left shadow-md rounded-full;
}
.process-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
.note-gui {
  @apply w-3/5 overflow-auto bg-gray-300 h-screen inline-block shadow-inner;
}
</style>
