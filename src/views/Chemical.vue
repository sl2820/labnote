<template>
  <div class="chemical-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        type="text"
        :value="chemical.name"
        class="p-2 w-full mr-2 flex-grow text-xl font-bold"
        @change="updateChemicalProperty($event, 'name')"
        @keyup.enter="updateChemicalProperty($event, 'name')"
      />
      <textarea
        class="relative w-full bg-trasnparent px-2 border mt-2 h-20 leading-normal"
        :value="chemical.description"
        @change="updateChemicalProperty($event, 'description')"
      />
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
  },
  methods: {
    updateChemicalProperty(e, key) {
      this.$store.commit("UPDATE_CHEMICAL", {
        chemical: this.chemical,
        key,
        value: e.target.value
      })
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
