<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <NoteColumn
        v-for="(column, $columnIndex) of note.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :note="note"
      />

      <div class="column">
        <input
          type="text"
          class="p-2 mr-2 flex-grow"
          placeholder="New Column Name"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>

      <div class="task-bg" v-if="isTaskOpen" @click.self="closeTask">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { uuid } from "@/utils"
import NoteColumn from "@/components/NoteColumn"

export default {
  components: { NoteColumn },
  data() {
    return {
      newColumnName: "",
    }
  },
  computed: {
    ...mapState(["note"]),
    isTaskOpen() {
      return (
        this.$route.name === "chemical" ||
        this.$route.name === "process" ||
        this.$route.name === "memo" ||
        this.$route.name === "analysis"
      )
    },
  },
  methods: {
    createColumn() {},
    createChemical() {
      var id = uuid()
      this.$store.commit("CREATE_CHEMICAL", {
        id: id,
      })
      this.$router.push({ name: "chemical", params: { id: id } })
    },
    createProcess() {
      var id = uuid()
      this.$store.commit("CREATE_PROCESS", {
        id: id,
      })
      this.$router.push({ name: "process", params: { id: id } })
    },
    openTask(task) {
      if (task.type === "chemical") {
        this.$router.push({ name: "chemical", params: { id: task.id } })
      } else if (task.type === "process") {
        this.$router.push({ name: "process", params: { id: task.id } })
      } else if (task.type === "memo") {
        this.$router.push({ name: "memo", params: { id: task.id } })
      }
    },
    closeTask() {
      this.$router.push({ name: "note" })
    },
    openAnalysis() {
      this.$router.push({ name: "analysis", params: { id: this.note.id } })
    },
    save() {
      this.$store.commit("SAVE_PROJECT", {
        note_data: localStorage.getItem("note"),
      })
    },
    refresh() {
      localStorage.clear()
      location.reload()
    },
    load() {
      this.$store.commit("LOAD_PROJECT", {
        projectID: 2,
      })
    },
    // moveTask(e, toTaskIndex) {
    //   const fromTaskIndex = e.dataTransfer.getData("from-task-index");
    //   this.$store.commit("MOVE_TASK", {
    //     fromTaskIndex,
    //     toTaskIndex
    //   });
    // },
    // pickupTask(e, fromTaskIndex) {
    //   e.dataTransfer.effectAllowed = "move";
    //   e.dataTransfer.dropEffect = "move";
    //   e.dataTransfer.setData("from-task-index", fromTaskIndex);
    // }
  },
}
</script>

<style lang="css">
.title-menu {
  background: #eceff1;
}
.board {
  @apply p-4 bg-gray-200 h-screen overflow-auto;
}
.task-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
