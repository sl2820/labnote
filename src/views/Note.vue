<template>
  <div>
    <div class="note-tui">
      <div class="items-start">
        <AppButton
          class="mx-3 mb-5 bg-teal-500 rounded-sm"
          @click.native="createChemical()"
        >Create Chemical</AppButton>
        <AppButton
          class="mx-3 mb-5 bg-indigo-500 rounded-full"
          @click.native="createProcess()"
        >Create Process</AppButton>
        <!-- <div
          v-for="(task, $taskIndex) in note.tasks"
          :key="$taskIndex + '-chemical'"
          draggable
          @drop="moveTask($event, $taskIndex)"
          @dragover.prevent
          @dragenter.prevent
          @dragstart.self="pickupTask($event, $taskIndex)"
          @click="openTask(task)"
        >-->
        <div
          v-for="(task, $taskIndex) in note.tasks"
          :key="$taskIndex + '-chemical'"
          @click="openTask(task)"
        >
          <div class="chemical" v-if="task.type === 'chemical'">
            <AppChemical :chemical="task" :taskIndex="$taskIndex" />
          </div>
          <div class="process" v-else-if="task.type === 'process'">
            <AppProcess :process="task" :taskIndex="$taskIndex" />
          </div>
        </div>
      </div>
    </div>

    <div class="note-gui">
      <AppPipeline />
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="closeTask">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { uuid } from "@/utils";
import AppButton from "@/components/AppButton";
import AppChemical from "@/components/AppChemical";
import AppProcess from "@/components/AppProcess";
import AppPipeline from "@/components/AppPipeline";

export default {
  components: { AppButton, AppChemical, AppProcess, AppPipeline },
  data() {
    return {};
  },
  computed: {
    ...mapState(["note"]),
    isTaskOpen() {
      return this.$route.name === "chemical" || this.$route.name === "process";
    }
  },
  methods: {
    createChemical() {
      var id = uuid();
      this.$store.commit("CREATE_CHEMICAL", {
        id: id
      });
      this.$router.push({ name: "chemical", params: { id: id } });
    },
    createProcess() {
      var id = uuid();
      this.$store.commit("CREATE_PROCESS", {
        id: id
      });
      this.$router.push({ name: "process", params: { id: id } });
    },
    openTask(task) {
      if (task.type === "chemical") {
        this.$router.push({ name: "chemical", params: { id: task.id } });
      } else if (task.type === "process") {
        this.$router.push({ name: "process", params: { id: task.id } });
      }
    },
    closeTask() {
      this.$router.push({ name: "note" });
    }
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
  }
};
</script>

<style lang="css">
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
.note-gui {
  @apply w-3/5 overflow-auto bg-gray-300 h-screen inline-block shadow-inner;
}
</style>
