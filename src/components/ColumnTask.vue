<template>
  <div @click="openTask(task)">
    <div class="chemical" v-if="task.type === 'chemical'">
      <AppChemical
        :chemical="task"
        :taskIndex="taskIndex"
        :columnIndex="columnIndex"
      />
    </div>
    <div class="process" v-else-if="task.type === 'process'">
      <AppProcess
        :process="task"
        :taskIndex="taskIndex"
        :columnIndex="columnIndex"
      />
    </div>
    <div class="memo" v-else-if="task.type === 'memo'">
      <AppMemo :memo="task" :taskIndex="taskIndex" :columnIndex="columnIndex" />
    </div>
  </div>
</template>

<script>
import AppChemical from "@/components/AppChemical"
import AppProcess from "@/components/AppProcess"
import AppMemo from "@/components/AppMemo"

export default {
  components: { AppChemical, AppProcess, AppMemo },
  props: {
    note: {
      type: Object,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    openTask(task) {
      if (task.type === "chemical") {
        this.$router.push({ name: "chemical", params: { id: task.id } })
      } else if (task.type === "process") {
        this.$router.push({ name: "process", params: { id: task.id } })
      } else if (task.type === "memo") {
        this.$router.push({ name: "memo", params: { id: task.id } })
      }
    },
  },
}
</script>

<style lang="css">
.chemical {
  @apply bg-teal-200 p-2 mb-3 text-left shadow-md rounded-sm;
}
.process {
  @apply bg-indigo-200 p-2 mb-3 text-left shadow-md rounded-full;
}
.memo {
  @apply bg-yellow-200 p-2 mb-3 text-left shadow-md rounded;
}
</style>
