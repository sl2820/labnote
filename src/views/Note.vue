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
      this.$store.commit("CREATE_COLUMN", { data })
      this.newColumnName = ""
    },
    closeTask() {
      // WILL BE REMOVED
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
