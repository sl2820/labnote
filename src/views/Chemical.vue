<template>
  <div class="chemical-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div v-for="(chem, $chemId) of chemical.ingredients" :key="$chemId">
        <div v-if="$chemId > 0" class="my-4">
          <hr />
        </div>
        <div class="inline-block text-xl font-black pr-2">Name:</div>
        <div class="chemical-input-fields text-l">
          <input
            placeholder="Search name"
            type="text"
            :value="chem.name"
            list="name"
            @change="updateChemicalProperty($event, 'name', chem.id)"
          />
          <datalist id="name">
            <option
              v-for="(name, $nameID) of get_chem_list"
              :key="$nameID"
              :value="name"
            ></option>
          </datalist>
        </div>
        <!-- Below is State Listing -->
        <div class="inline-block font-black pr-2">State:</div>
        <div class="chemical-input-fields text-l mr-48">
          <input
            class="w-24 mr-2"
            placeholder="Choose type"
            type="text"
            :value="chem.state"
            list="state"
            @change="updateChemicalProperty($event, 'state', chem.id)"
          />
          <datalist id="state">
            <option
              v-for="(state, $stateID) of get_state_list"
              :key="$stateID"
              :value="state"
            ></option>
          </datalist>
        </div>

        <div
          v-if="(chem != null) & (chem.property.length >= 1)"
          class="inline-block text-sm pr-2 font-bold italic"
        >
          {{ list_property(chem) }}
        </div>
        <div></div>
        <div class="inline-block font-black pr-2">Product #:</div>
        <div class="chemical-input-fields text-l">
          <input
            class="w-32 min-w-0 text-sm"
            placeholder="Enter product #"
            type="text"
            :value="chem.product_number"
            @change="updateChemicalProperty($event, 'product_number', chem.id)"
          />
        </div>
        <div></div>
        <div v-if="chem.state == 'solid'" class="font-black">
          Details:
          <div class="font-medium pr-2">
            - Weight:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter weight"
              type="text"
              :value="chem.weight"
              @change="updateChemicalProperty($event, 'weight', chem.id)"
            />
            Unit:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter Unit"
              type="text"
              :value="chem.w_unit"
              @change="updateChemicalProperty($event, 'w_unit', chem.id)"
            />
          </div>
        </div>
        <div v-else-if="chem.state == 'solution'" class="font-black">
          Details:
          <div class="font-medium pr-2">
            - Solvent:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter solvent"
              type="text"
              :value="chem.solvent"
              @change="updateChemicalProperty($event, 'solvent', chem.id)"
            />
          </div>
          <div class="font-medium pr-2">
            - Concentration:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter concentration"
              type="text"
              :value="chem.concentration"
              @change="updateChemicalProperty($event, 'concentration', chem.id)"
            />
            Unit:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter Unit"
              type="text"
              :value="chem.c_unit"
              @change="updateChemicalProperty($event, 'c_unit', chem.id)"
            />
          </div>
          <div class="font-medium pr-2">
            - Volume:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter volume"
              type="text"
              :value="chem.volume"
              @change="updateChemicalProperty($event, 'volume', chem.id)"
            />
            Unit:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter Unit"
              type="text"
              :value="chem.v_unit"
              @change="updateChemicalProperty($event, 'v_unit', chem.id)"
            />
          </div>
        </div>
        <div v-else-if="chem.state == 'liquid'" class="font-black">
          Details:
          <div class="font-medium pr-2">
            - volume:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter volume"
              type="text"
              :value="chem.volume"
              @change="updateChemicalProperty($event, 'volume', chem.id)"
            />
            Unit:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter Unit"
              type="text"
              :value="chem.v_unit"
              @change="updateChemicalProperty($event, 'v_unit', chem.id)"
            />
          </div>
        </div>
        <div v-else-if="chem.state == 'gas'" class="font-black">
          Details:
          <div class="font-medium pr-2">
            - volume:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter volume"
              type="text"
              :value="chem.volume"
              @change="updateChemicalProperty($event, 'volume', chem.id)"
            />
            Unit:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter Unit"
              type="text"
              :value="chem.v_unit"
              @change="updateChemicalProperty($event, 'v_unit', chem.id)"
            />
          </div>
          <div class="font-medium pr-2">
            - Pressure:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter pressure"
              type="text"
              :value="chem.pressure"
              @change="updateChemicalProperty($event, 'pressure', chem.id)"
            />
            Unit:
            <input
              class="chemical-input-fields w-20 min-w-0 text-xs"
              placeholder="Enter Unit"
              type="text"
              :value="chem.p_unit"
              @change="updateChemicalProperty($event, 'p_unit', chem.id)"
            />
          </div>
        </div>
        <div v-else class="font-black">
          Details:
          <p class="font-medium">Unidentified states. Plese check</p>
        </div>
      </div>
      <div class="chemical-input-fields mt-6">
        <textarea
          v-model="additional"
          placeholder="add notes"
          cols="60"
          @change="additionalNote(additional)"
        ></textarea>
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
      temp_name: null,
      temp_state: null,
      sigma_obj: sigma.sigmaaldrich,
      additional: null,
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
      const found = this.chemical.ingredients.find(({ id }) => id === chemid)
      var value_
      if (key == "name") {
        value_ = e.target.value.split("-")[0]
        this.temp_name = e.target.value
      } else {
        value_ = e.target.value
        this.temp_state = e.target.value
      }
      this.$store.commit("UPDATE_TASK", {
        chemical: found,
        key,
        value: value_,
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
    },
    list_property(chem) {
      var list = ""
      let i = 0
      while (i < chem.property.length) {
        list = list + " " + chem.property[i]
        i++
      }

      return list
    },
    additionalNote(n) {
      this.additional = n
      this.$store.commit("UPDATE_TASK", {
        chemical: this.chemical,
        key: "additional",
        value: n,
      })
    },
  },
}
</script>

<style lang="css">
.chemical-view {
  @apply relative flex flex-row my-32 mx-auto bg-white p-4 inset-0 text-left rounded shadow;
  max-width: 800px;
  min-height: 0%;
}
.chemical-input-fields {
  @apply bg-teal-100 inline-block;
}
</style>
