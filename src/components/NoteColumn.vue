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

      this.$store.commit("CREATE_CHEMICAL", { columnID, data })
      this.$router.push({ name: "chemical", params: { id: id } })
    },
    createProcess() {
      console.log("+ process clicked")
    },
    createMemo() {
      console.log("+ memo clicked")
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
