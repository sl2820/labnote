<template>
  <div class="chemical-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div class="p-2 w-full text-2xl font-bold">
        <div class="inline-block mr-2">Formula:</div>
        <input
          type="text"
          :value="chemical.formula"
          @change="updateChemicalProperty($event, 'formula')"
        />
      </div>
      <div class="p-2 w-full mr-2 flex-grow text-xl font-medium">
        <div class="inline-block mr-2">Name:</div>
        <input
          type="text"
          :value="chemical.name[0]"
          @change="updateChemicalProperty($event, 'name')"
          @keyup.enter="updateChemicalProperty($event, 'name')"
        />
      </div>
      <div class="p-2 w-full mr-2 flex-grow text-lg">
        <div class="inline-block mr-2">Product Number:</div>
        <input
          type="text"
          class="italic"
          :value="chemical.product_number"
          @change="updateChemicalProperty($event, 'product_number')"
        />
      </div>
      <div class="p-2 w-full mr-2 flex-grow text-base font-normal">
        <div class="inline-block mr-2">Molecular weight:</div>
        <input
          type="text"
          :value="chemical.molecular_weight"
          @change="updateChemicalProperty($event, 'molecular_weight')"
        />
      </div>

      <div class="p-2 w-full mr-2 flex-grow text-base font-normal">
        <div class="inline-block mr-2">State:</div>
        <select
          :value="chemical.state"
          @change="updateChemicalProperty($event, 'state')"
        >
          <option value="solid">solid</option>
          <option value="solution">solution</option>
        </select>
      </div>
      <!-- <textarea
        class="relative w-full bg-trasnparent px-2 border mt-2 h-20 leading-normal"
        :value="chemical.description"
        @change="updateChemicalProperty($event, 'description')"
      /> -->
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
