<template>
  <div>
    <ul class="flex justify-between">
      <li class="mr-2">
        📝
        <div class="inline-block font-bold mr-4">{{ memo.info.title }}</div>
      </li>
      <li class="mr-2">
        <button
          class="inline-block text-xs"
          @click.stop="removeMemo(note, columnIndex, taskIndex)"
        >
          ✖️
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  props: {
    memo: {
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
    ...mapGetters(["getColumn"]),
  },
  methods: {
    removeMemo(note, columnIndex, taskIndex) {
      this.$store.commit("REMOVE_TASK", { note, columnIndex, taskIndex })
    },
  },
}
</script>

<style scoped></style>
