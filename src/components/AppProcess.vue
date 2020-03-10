<template>
  <div>
    <ul class="flex justify-between">
      <li class="mr-2">
        🔬
        <div class="inline-block font-bold mr-4">{{ process.details.method }}</div>

        <div class="inline-block">{{ inputs }}</div>

        <div v-if="process.details.reactive" class="inline-block text-sm text-gray-600 ml-8">
          💥
          <div class="inline-block mr-2">{{ process.details.detail }}</div>
          <div class="inline-block mr-2">w/{{ process.details.instrument }}</div>
          <div class="inline-block mr-2">{{ process.details.rpm }}rpm</div>
          <div class="inline-block mr-2">{{ process.details.temperature }}°C</div>
        </div>
      </li>
      <li class="mr-2">
        <button class="inline-block text-sm" @click.stop="removeProcess(note, processIndex)">✖️</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    process: {
      type: Object,
      required: true
    },
    processIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(["note"]),
    inputs() {
      const ids = this.process.inputs;
      let names = [];
      for (const i of ids) {
        for (const c of this.note.tasks) {
          if (c.id === i) {
            for (const j of c.ingredients) {
              names.push(j.name);
            }
          }
        }
      }
      return names.join(", ");
    }
  },
  methods: {
    removeProcess(note, processIndex) {
      this.$store.commit("REMOVE_PROCESS", { note, processIndex });
    }
  }
};
</script>

<style scoped></style>
