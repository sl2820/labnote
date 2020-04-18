<template>
  <div>hello</div>
</template>

<script>
import { mapState } from "vuex"
import { uuid } from "@/utils"
// import AppButton from "@/components/AppButton";
// import AppChemical from "@/components/AppChemical";
// import AppProcess from "@/components/AppProcess";

export default {
  // components: { AppButton, AppChemical, AppProcess },
  data() {
    return {}
  },
  computed: {
    ...mapState(["note"]),
    isTaskOpen() {
      return (
        this.$route.name === "chemical" ||
        this.$route.name === "process" ||
        this.$route.name === "analysis"
      )
    },
  },
  methods: {
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
.note-tui {
  @apply p-4 bg-gray-100 h-screen w-2/5 overflow-auto inline-block;
}
.chemical {
  @apply bg-teal-200 p-3 mb-4 text-left shadow-md rounded-sm;
}
.task-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
.process {
  @apply bg-indigo-200 p-3 mb-4 text-left shadow-md rounded-full;
}
</style>
