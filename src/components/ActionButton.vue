<template>
  <button type="button" class="action-button" :class="typeClasses">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
  },
  created() {
    // this.$store.commit("Note/create")
  },
  computed: {
    typeClasses() {
      switch (this.type) {
        case "danger":
          return "bg-red"
        default:
          return "bg-teal"
      }
    },
  },
}
</script>

<style lang="css" scoped>
.action-button {
  @apply bg-gray-200 w-full inline-flex px-2 py-1 items-center rounded-lg mb-1;
}
</style>
