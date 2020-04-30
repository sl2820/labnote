<template>
  <div class="memo-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div class="memo-input-fields text-2xl font-black">
        <input
          type="text"
          :value="memo.info.title"
          @change="updateMemoProperty($event, 'title')"
        />
      </div>

      <div>
        <textarea
          class="memo-input-fields mt-3 p-2 border italic"
          :value="memo.info.description"
          cols="50"
          rows="10"
          @change="updateMemoProperty($event, 'description')"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"

export default {
  computed: {
    ...mapGetters(["getTask", "getColumn"]),
    ...mapState(["note"]),
    memo() {
      return this.getTask(this.$route.params.id)
    },
  },
  methods: {
    updateMemoProperty(e, key) {
      this.$store.commit("UPDATE_MEMO", {
        memo: this.memo.info,
        key,
        value: e.target.value,
      })
    },
  },
}
</script>

<style lang="css">
.memo-view {
  @apply relative flex flex-row my-32 mx-auto bg-white p-4 inset-0 text-left rounded shadow;
  max-width: 600px;
  min-height: 0%;
}
.memo-input-fields {
  @apply bg-yellow-200 inline-block;
}
</style>
