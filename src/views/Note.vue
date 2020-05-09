<template>
  <div>
    <div class="board">
      <NoteNav :note="note" />
      <div class="flex flex-row items-start ml-3 mt-10">
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
          <div>
            <ul class="flex justify-between mt-2 mr-5 ml-5 text-2xl">
              <li><button @click.stop="createChemical()">+🧪</button></li>
              <li><button @click.stop="createProcess()">+🔬</button></li>
              <li><button @click.stop="createMemo()">+📝</button></li>
            </ul>
          </div>
        </div>

        <div class="task-bg" v-if="isTaskOpen" @click.self="closeTask">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import NoteNav from "@/components/NoteNav"
import NoteColumn from "@/components/NoteColumn"
import templates from "@/data/new_templates"
import { uuid } from "@/utils"

export default {
  components: { NoteNav, NoteColumn },
  data() {
    return {
      newColumnName: "",
      new_column: templates.new_column,
      new_chemical: templates.new_chemical_edited,
      new_process: templates.new_process,
      new_memo: templates.new_memo,
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
    createColumn() {
      let data = this.new_column
      data.id = uuid()
      data.name = this.newColumnName
      const column = JSON.stringify(data)
      this.$store.commit("CREATE_COLUMN", { column })
      this.newColumnName = ""
    },
    createChemical() {
      let data = this.new_column
      const columnID = uuid()
      data.id = columnID
      data.name = " "
      const column = JSON.stringify(data)
      this.$store.commit("CREATE_COLUMN", { column })

      const id = uuid()
      let task = this.new_chemical
      task.id = id
      data = JSON.stringify(task)
      this.$store.commit("CREATE_TASK", { columnID, data })
      this.$router.push({ name: "chemical", params: { id: id } })
    },
    createProcess() {
      let data = this.new_column
      const columnID = uuid()
      data.id = columnID
      data.name = " "
      const column = JSON.stringify(data)
      this.$store.commit("CREATE_COLUMN", { column })

      const id = uuid()
      let task = this.new_process
      task.id = id
      data = JSON.stringify(task)
      this.$store.commit("CREATE_TASK", { columnID, data })
      this.$router.push({ name: "process", params: { id: id } })
    },
    createMemo() {
      let data = this.new_column
      const columnID = uuid()
      data.id = columnID
      data.name = " "
      const column = JSON.stringify(data)
      this.$store.commit("CREATE_COLUMN", { column })

      const id = uuid()
      let task = this.new_memo
      task.id = id
      data = JSON.stringify(task)
      this.$store.commit("CREATE_TASK", { columnID, data })
      this.$router.push({ name: "memo", params: { id: id } })
    },
    closeTask() {
      this.$router.push({ name: "note" })
    },
  },
}
</script>

<style lang="css">
.board {
  @apply bg-gray-200 overflow-auto h-screen;
}
.task-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
