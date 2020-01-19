<template>
  <div class="chemical-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      {{ chemical }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(["getChemical"]),
    chemical() {
      return this.getChemical(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
.chemical-view {
  @apply relative flex flex-row bg-white inset-0 mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
