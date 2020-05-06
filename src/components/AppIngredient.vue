<template>
  <div class="mb-4">
    🧪
    <!-- NAME -->
    <div class="flex w-full">
      <div class="justify-start flex-grow-0 mr-2">
        Name
      </div>
      <input
        placeholder="Search name"
        class="flex-grow w-full chemical-input-fields"
        type="text"
        :value="ingredient.name"
        list="name"
        @change="updateChemicalProperty($event, 'name', ingredient.id)"
      />
      <datalist id="name">
        <option
          v-for="(name, $nameID) of get_chem_list"
          :key="$nameID"
          :value="name"
        ></option>
      </datalist>
    </div>

    <!-- PRODUCT NUMBER -->
    <div class="flex w-full">
      <div class="justify-start flex-grow-0 mr-2">
        Product:
      </div>
      <input
        class="flex-grow w-full chemical-input-fields"
        placeholder="Enter product #"
        type="text"
        :value="ingredient.product_number"
        @change="
          updateChemicalProperty($event, 'product_number', ingredient.id)
        "
      />
    </div>

    <!-- STATE -->
    <div class="flex w-full">
      <div class="justify-start flex-grow-0 mr-2">State:</div>
      <input
        class="flex-grow w-full chemical-input-fields"
        placeholder="Choose type"
        type="text"
        :value="ingredient.state"
        list="state"
        @change="updateChemicalProperty($event, 'state', ingredient.id)"
      />
      <datalist id="state">
        <option
          v-for="(state, $stateID) of get_state_list"
          :key="$stateID"
          :value="state"
        ></option>
      </datalist>
    </div>

    <!-- HISTORY -->
    <div
      class="flex w-full"
      v-if="(ingredient != null) & (ingredient.property.length >= 1)"
    >
      <div class="justify-start flex-grow-0 mr-2">History:</div>
      <div class="flex-grow w-full italic">{{ list_property(ingredient) }}</div>
    </div>

    <!-- DETAILS -->
    <div class="mt-1">
      <div v-if="ingredient.state == 'solid'">
        <div>
          Weight:
          <input
            class="chemical-input-fields w-30 min-w-0"
            placeholder="Enter weight"
            type="text"
            :value="ingredient.weight"
            @change="updateChemicalProperty($event, 'weight', ingredient.id)"
          />
          <!--
          Unit:
          <input
            class="chemical-input-fields w-20 min-w-0"
            placeholder="Enter Unit"
            type="text"
            :value="ingredient.w_unit"
            @change="updateChemicalProperty($event, 'w_unit', ingredient.id)"
          />-->
        </div>
      </div>
      <div v-else-if="ingredient.state == 'solution'">
        <div>
          Solvent:
          <input
            class="chemical-input-fields w-30 min-w-0"
            placeholder="Enter solvent"
            type="text"
            :value="ingredient.solvent"
            @change="updateChemicalProperty($event, 'solvent', ingredient.id)"
          />
        </div>
        <div>
          Concentration:
          <input
            class="chemical-input-fields w-30 min-w-0"
            placeholder="Enter concentration"
            type="text"
            :value="ingredient.concentration"
            @change="
              updateChemicalProperty($event, 'concentration', ingredient.id)
            "
          />
          <!--
          Unit:
          <input
            class="chemical-input-fields w-20 min-w-0"
            placeholder="Enter Unit"
            type="text"
            :value="ingredient.c_unit"
            @change="updateChemicalProperty($event, 'c_unit', ingredient.id)"
          />
          -->
        </div>
        <div>
          Volume:
          <input
            class="chemical-input-fields w-30 min-w-0"
            placeholder="Enter volume"
            type="text"
            :value="ingredient.volume"
            @change="updateChemicalProperty($event, 'volume', ingredient.id)"
          />
          <!--
          Unit:
          <input
            class="chemical-input-fields w-20 min-w-0"
            placeholder="Enter Unit"
            type="text"
            :value="ingredient.v_unit"
            @change="updateChemicalProperty($event, 'v_unit', ingredient.id)"
          />
          -->
        </div>
      </div>
      <div v-else-if="ingredient.state == 'liquid'">
        <div>
          Volume:
          <input
            class="chemical-input-fields w-30 min-w-0"
            placeholder="Enter volume"
            type="text"
            :value="ingredient.volume"
            @change="updateChemicalProperty($event, 'volume', ingredient.id)"
          />
          <!--
          Unit:
          <input
            class="chemical-input-fields w-20 min-w-0"
            placeholder="Enter Unit"
            type="text"
            :value="ingredient.v_unit"
            @change="updateChemicalProperty($event, 'v_unit', ingredient.id)"
          />
        -->
        </div>
      </div>
      <div v-else-if="ingredient.state == 'gas'">
        <div>
          Volume:
          <input
            class="chemical-input-fields w-30 min-w-0"
            placeholder="Enter volume"
            type="text"
            :value="ingredient.volume"
            @change="updateChemicalProperty($event, 'volume', ingredient.id)"
          />
          <!--
          Unit:
          <input
            class="chemical-input-fields w-20 min-w-0"
            placeholder="Enter Unit"
            type="text"
            :value="ingredient.v_unit"
            @change="updateChemicalProperty($event, 'v_unit', ingredient.id)"
          />
        -->
        </div>
        <div>
          Pressure:
          <input
            class="chemical-input-fields w-30 min-w-0"
            placeholder="Enter pressure"
            type="text"
            :value="ingredient.pressure"
            @change="updateChemicalProperty($event, 'pressure', ingredient.id)"
          />
          <!--
          Unit:
          <input
            class="chemical-input-fields w-20 min-w-0"
            placeholder="Enter Unit"
            type="text"
            :value="ingredient.p_unit"
            @change="updateChemicalProperty($event, 'p_unit', ingredient.id)"
          />
          -->
        </div>
      </div>
      <div v-else>
        <p>Unidentified states. Please check</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import sigma from "@/data/sample_sigmaaldrich"
import data_autocomplete from "@/data/data_autocomplete"

export default {
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      names: data_autocomplete.names,
      formulas: data_autocomplete.formulas,
      products: data_autocomplete.products,
      temp_name: null,
      temp_state: null,
      sigma_obj: sigma.sigmaaldrich,
    }
  },
  computed: {
    ...mapGetters(["getTask"]),
    chemical() {
      return this.getTask(this.$route.params.id)
    },
    get_chem_list() {
      var formatted = []
      for (let i = 0; i < this.sigma_obj.length; i++) {
        for (let j = 0; j < this.sigma_obj[i].names.length; j++) {
          var value =
            this.sigma_obj[i].formula + "-" + this.sigma_obj[i].names[j]
          formatted.push(value)
        }
      }
      // var random = ["a", "b"];
      return formatted.sort()
    },
    get_state_list() {
      var clean
      if (this.temp_name != null) {
        clean = this.temp_name.split("-")[0]
      } else {
        clean = ""
      }
      var formatted = []
      for (let i = 0; i < this.sigma_obj.length; i++) {
        if (clean.localeCompare(this.sigma_obj[i].formula) == 0) {
          for (let j = 0; j < this.sigma_obj[i].states.length; j++) {
            var value = this.sigma_obj[i].states[j]
            formatted.push(value)
          }
        }
      }
      return formatted
    },
  },
  methods: {
    updateChemicalProperty(e, key, chemid) {
      let found = null
      if (
        this.chemical.ingredients.find(({ id }) => id === chemid) != undefined
      ) {
        found = this.chemical.ingredients.find(({ id }) => id === chemid)
      } else {
        found = this.chemical.ingredients[0]
      }

      var value_
      if (key === "name") {
        value_ = e.target.value.split("-")[0]
        this.temp_name = e.target.value
      } else {
        value_ = e.target.value
        this.temp_state = e.target.value
      }
      this.$store.commit("UPDATE_CHEMICAL", {
        chemical: found,
        key,
        value: value_,
      })
    },
    list_property(chem) {
      var list = ""
      let i = 0
      while (i < chem.property.length) {
        if (i == chem.property.length - 1) {
          list = list + chem.property[i]
          i++
        } else {
          list = list + chem.property[i] + ", "
          i++
        }
      }

      return list
    },
  },
}
</script>

<style lang="css"></style>
