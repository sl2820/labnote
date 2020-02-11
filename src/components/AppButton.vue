<template>
  <button type="button" class="button" :class="typeClasses">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String
    }
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
    }
  }
}
</script>

<style lang="css" scoped>
.button {
  @apply inline-flex px-4 py-2 text-white font-bold items-center;
}
</style>
