<template>
  <div class="chemical-view">
    Chemical!!!
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div
        class="p-2 w-full font-serif italic underline mb-0 text-sm text-gray-600"
      ></div>
      <div class="p-2 w-full text-2xl font-bold">
        <div class="inline-block">Formula:</div>
        <input
          type="text"
          class="w-full"
          :value="chemical.formula"
          @change="updateChemicalProperty($event, 'formula')"
          list="formula"
        />
        <datalist id="formula">
          <option
            v-for="(formu, $formuId) of formulas"
            :key="$formuId"
            :value="formu"
          />
        </datalist>
      </div>
      <div class="p-2 w-full mr-2 flex-grow text-xl font-medium">
        <div class="inline-block mr-2">Name:</div>
        <input
          type="text"
          class="w-full"
          :value="chemical.name"
          @change="updateChemicalProperty($event, 'name')"
          @keyup.enter="updateChemicalProperty($event, 'name')"
          list="name"
        />
        <datalist id="name">
          <option
            v-for="(chem, $chemId) of names"
            :key="$chemId"
            :value="chem"
          />
        </datalist>
      </div>
      <div class="p-2 w-full mr-2 flex-grow text-lg">
        <div class="inline-block mr-2">Product Number:</div>
        <input
          type="text"
          class=""
          :value="chemical.product_number"
          @change="updateChemicalProperty($event, 'product_number')"
          list="product"
        />
        <datalist id="product">
          <option
            v-for="(prod, $prodId) of products"
            :key="$prodId"
            :value="prod"
          />
        </datalist>
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
      <div
        class="relative w-full bg-trasnparent px-2 border mt-2 h-20 leading-normal"
      >
        <p>description:</p>
        <textarea
          class="w-full"
          :value="chemical.description"
          @change="updateChemicalProperty($event, 'description')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import database from "../database"

export default {
  data() {
    return {
      isEditing: false,
      selectedChemical: null,
      names: database.names,
      formulas: database.formulas,
      products: database.products
    }
  },
  computed: {
    ...mapGetters(["getChemical"]),
    chemical() {
      return this.getChemical(this.$route.params.id)
    },
    chemical_formula() {
      const s = this.chemical.formula
      return s.replace(/\d+/g, "<sub>$1</sub>")
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
  @apply relative flex flex-row my-32 mx-auto bg-white p-4 inset-0 text-left rounded shadow;
  max-width: 600px;
  min-height: 0%;
}
</style>
