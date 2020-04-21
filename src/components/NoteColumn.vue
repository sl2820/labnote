<template>
  <div class="column">
    <div class="flex items-center mb-2">{{ column.name }}</div>

    <div class="list-reset">
      <ColumnTask
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :taskIndex="$taskIndex"
        :column="column"
        :columnIndex="columnIndex"
        :note="note"
      />

      <div>
        <button @click.stop="createChemical()">+C</button>
        <button @click.stop="createProcess()">+P</button>
        <button @click.stop="createMemo()">+M</button>
      </div>
    </div>
  </div>
</template>

<script>
import ColumnTask from "@/components/ColumnTask"

export default {
  components: { ColumnTask },
  props: {
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
    createTask() {},
    createProcess() {},
    createMemo() {},
  },
}
</script>

<style lang="css">
.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded;
  min-width: 300px;
}
</style>
