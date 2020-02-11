<template>
  <div class="chemical-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div v-for="(chem, $chemId) of chemical.ingredients" :key="$chemId">
        <div v-if="$chemId > 0" class="my-4">
          <hr />
        </div>
        <div class="inline-block">
          <input
            type="text"
            :value="chem.name"
            list="name"
            @change="updateChemicalProperty($event, 'name', chem.id)"
          />
          <datalist id="name">
            <option
              v-for="(name, $nameID) of names"
              :key="$nameID"
              :value="name"
            ></option>
          </datalist>
        </div>
        <div>Volumn: {{ chem.volumn }}{{ chem.v_unit }}</div>
        <div>Concentration: {{ chem.concentration }}{{ chem.c_unit }}</div>
        <div>Product Number: {{ chem.product_number }}</div>
        <div>State: {{ chem.state }}</div>
        <div>Solvent: {{ chem.solvent }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import data_autocomplete from "@/data/data_autocomplete"

export default {
  data() {
    return {
      names: data_autocomplete.names,
      formulas: data_autocomplete.formulas,
      products: data_autocomplete.products
    }
  },
  computed: {
    ...mapGetters(["getChemical"]),
    chemical() {
      return this.getChemical(this.$route.params.id)
    }
  },
  methods: {
    updateChemicalProperty(e, key, chemid) {
      const found = this.chemical.ingredients.find(({ id }) => id === chemid)
      this.$store.commit("UPDATE_CHEMICAL", {
        chemical: found,
        key,
        value: e.target.value
      })
    }
  }
}
</script>

<style scoped>
.chemical-view {
  @apply relative flex flex-row my-32 mx-auto bg-white p-4 inset-0 text-left rounded shadow;
  max-width: 600px;
  min-height: 0%;
}
</style>
