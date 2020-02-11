<template>
  <div class="process-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div class="text-2xl font-black">{{ process.type.method }}</div>
      <div>Inputs: {{ inputs }}</div>
      <div v-if="process.type.reactive">
        <div>Method: {{ process.type.detail }}</div>
        <div>Instrument: {{ process.type.instrument }}</div>
        <div>RPM: {{ process.type.rpm }}</div>
        <div>Temperature: {{ process.type.temperature }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"

export default {
  computed: {
    ...mapGetters(["getProcess"]),
    ...mapState(["note"]),
    process() {
      return this.getProcess(this.$route.params.id)
    },
    inputs() {
      const ids = this.process.inputs
      let names = []
      for (const i of ids) {
        for (const c of this.note.components) {
          if (c.id === i) {
            for (const ingre in c.ingredients) {
              names.push(c.ingredients[ingre].name)
            }
          }
        }
      }
      return names.join(", ")
    }
  },
  methods: {}
}
</script>

<style scoped>
.process-view {
  @apply relative flex flex-row my-32 mx-auto bg-white p-4 inset-0 text-left rounded shadow;
  max-width: 600px;
  min-height: 0%;
}
</style>
