<template>
  <div>
    <ul class="flex justify-between">
      <li class="mr-2">
        🔬
        <div class="inline-block font-bold mr-4">{{ process.info.name }}</div>
        <span>
          <!-- {{ details(this.process.info) }} -->
        </span>
      </li>
      <li class="mr-2">
        <button
          class="inline-block text-xs"
          @click.stop="removeProcess(note, columnIndex, taskIndex)"
        >
          ✖️
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  props: {
    process: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(["note"]),
  },
  methods: {
    removeProcess(note, columnIndex, taskIndex) {
      this.$store.commit("REMOVE_TASK", { note, columnIndex, taskIndex })
    },

    details(info) {
      const name = info.name
      let data = null

      if (name === "Mix") {
        const inputs = info.inputs
        let d = []
        for (const i of inputs) {
          d.push(i.id)
        }
        // data = d.join(",")
        data = null
      } else {
        let this_id = info.chem_for.id
        let name = []
        const ingrs = this.note.tasks.find(({ id }) => id === this_id)
          .ingredients
        for (const i of ingrs) {
          name.push(i.name)
        }
        data = name.join("+")
      }

      return data
    },
  },
}
</script>

<style scoped></style>
