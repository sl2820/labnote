<template>
  <div class="column">
    <div class="flex w-full mb-2">
      <input
        class="w-full flex-grow"
        type="text"
        placeholder="Column name"
        :value="column.name"
        @change="update_column_name($event, 'name')"
      />
      <button
        class="inline-block text-sm"
        @click.stop="removeColumn(note, columnIndex)"
      >
        ✖️
      </button>
    </div>

    <div>
      <div class="column-list">
        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :note="note"
        />
      </div>

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
  },
  methods: {
    update_column_name(e, k) {
      this.$store.commit("UPDATE_COLUMN", {
        column: this.column,
        key: k,
        value: e.target.value,
      })
    },
    createChemical() {
      const columnID = this.column.id
      const id = uuid()
      let data = this.new_chemical
      data.id = id
      data = JSON.stringify(data)
      this.$store.commit("CREATE_TASK", { columnID, data })
      this.$router.push({ name: "chemical", params: { id: id } })
    },
    createProcess() {
      const columnID = this.column.id
      const id = uuid()
      let data = this.new_process
      data.id = id
      data = JSON.stringify(data)
      this.$store.commit("CREATE_TASK", { columnID, data })
      this.$router.push({ name: "process", params: { id: id } })
    },
    createMemo() {
      const columnID = this.column.id
      const id = uuid()
      let data = this.new_memo
      data.id = id
      data = JSON.stringify(data)
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
.column-list {
  @apply overflow-y-auto;
  min-height: 0%;
  /* max-height: 80%; */
  max-height: 600px;
}
</style>
