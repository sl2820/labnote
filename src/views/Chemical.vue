<template>
  <div class="chemical-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div v-for="(chem, $chemId) of chemical.ingredients" :key="$chemId">
        <div v-if="$chemId > 0" class="my-4">
          <hr />
        </div>
        <div class="inline-block text-2xl font-black">
          <input
            type="text"
            :value="chem.formula"
            list="name"
            @change="updateChemicalProperty($event, 'name', chem.id)"
          />
          <datalist id="name">
            <option
              v-for="(name, $nameID) of getlist"
              :key="$nameID"
              :value = "name"
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
  import sigma from "@/data/sample_sigmaaldrich"
  import data_autocomplete from "@/data/data_autocomplete"

  export default {
  data() {
  return {
  names: data_autocomplete.names,
  formulas: data_autocomplete.formulas,
  products: data_autocomplete.products,

  sigma_obj: sigma.sigmaaldrich
  }
  },
  computed: {
  ...mapGetters(["getTask"]),
  chemical() {
  return this.getTask(this.$route.params.id)
},
    getlist(){
      var formatted = [];
      for (let i = 0; i<this.sigma_obj.length; i++){
        for (let j = 0; j <this.sigma_obj[i].names.length; j++){
            var value = this.sigma_obj[i].formula +"-"+ this.sigma_obj[i].names[j];
            // formatted.push(this.toFormula(value));
            // console.log(this.toFormula(value));
            // console.log(value);
            formatted.push(value);

        }
      }
      // var random = ["a", "b"];
      return formatted.sort();
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
},
toFormula(name) {
  let num = name.match(/\d/g)
  let sub = []
  if (num) {
    for (const n of name) {
      if (n.match(/\d/)) {
        sub.push("<sub>" + n.toString() + "</sub>")
      } else {
        sub.push(n)
      }
    }
    // console.log(sub)
    return sub.join("")
  } else {
    return name
  }
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
