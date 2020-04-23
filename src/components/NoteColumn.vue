<template>
  <div class="column">
    <div class="flex items-center mb-2">
      <ul class="flex justify-between">
        <li>{{ column.name }}</li>
        <li class="mr-2">
          <button
            class="inline-block text-sm"
            @click.stop="removeColumn(note, columnIndex)"
          >
            ✖️
          </button>
        </li>
      </ul>
    </div>

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
        <ul class="flex justify-between mt-2 mr-5 ml-5 text-2xl">
          <li><button @click.stop="createChemical()">+🧪</button></li>
          <li><button @click.stop="createProcess()">+🔬</button></li>
          <li><button @click.stop="createMemo()">+📝</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from "@/utils"
import templates from "@/data/new_templates"
import ColumnTask from "@/components/ColumnTask"

export default {
  components: { ColumnTask },
  data() {
    return {
      new_chemical: templates.new_chemical,
      new_process: templates.new_process,
      new_memo: templates.new_memo,
    }
  },
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
    createChemical() {
      const columnID = this.column.id
      const id = uuid()
      let data = this.new_chemical
      data.id = id

      this.$store.commit("CREATE_TASK", { columnID, data })
      this.$router.push({ name: "chemical", params: { id: id } })
    },
    createProcess() {
      const columnID = this.column.id
      const id = uuid()
      let data = this.new_process
      data.id = id

      this.$store.commit("CREATE_TASK", { columnID, data })
      this.$router.push({ name: "process", params: { id: id } })
    },
    createMemo() {
      const columnID = this.column.id
      const id = uuid()
      let data = this.new_memo
      data.id = id

      this.$store.commit("CREATE_TASK", { columnID, data })
      this.$router.push({ name: "memo", params: { id: id } })
    },
    removeColumn(note, columnIndex) {
      this.$store.commit("REMOVE_COLUMN", { note, columnIndex })
    },
  },
}
</script>

<style lang="css">
.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded w-1/4;
  min-width: 300px;
}
</style>
