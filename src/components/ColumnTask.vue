<template>
  <div @click="openTask(task)">
    <div class="chemical" v-if="task.type === 'chemical'">
      <AppChemical :chemical="task" :taskIndex="$taskIndex" />
    </div>
    <div class="process" v-else-if="task.type === 'process'">
      <AppProcess :process="task" :taskIndex="$taskIndex" />
    </div>
    <div class="memo" v-else-if="task.type === 'memo'">
      <AppProcess :memo="task" :taskIndex="$taskIndex" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
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
    note: {
      type: Object,
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
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white no-underline;
}
.chemical {
  @apply bg-teal-200 p-3 mb-4 text-left shadow-md rounded-sm;
}
.process {
  @apply bg-indigo-200 p-3 mb-4 text-left shadow-md rounded-full;
}
.memo {
  @apply bg-yellow-200 p-3 mb-4 text-left shadow-md rounded-full;
}
</style>
