<template>
  <div class="chemical-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div class="flex w-full mt-3">
        <div class="justify-start flex-grow mr-10">
          🧪
          <!-- NICKNAME -->
          <div class="flex mt-2 w-full">
            <div class="mr-2 inline-block flex-none">
              Nickname:
            </div>
            <input
              type="text"
              class="flex-grow w-full chemical-input-fields"
              placeholder="Give nick name"
              :value="chemical.info.nickname"
              @change="updateChemicalInfo($event, 'nickname')"
            />
          </div>

          <!-- DISPLAY NAME -->
          <div class="flex mt-2 w-full">
            <div class="mr-2 inline-block flex-none">
              Chemical:
            </div>
            <input
              placeholder="Search name"
              class="flex-grow w-full chemical-input-fields"
              type="text"
              v-model="chemical.info.display"
              list="name"
              @change="updateChemicalInfo($event, 'display')"
              @input="updateAutoCompleteCandidates($event, 'name')"
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
          <div
            v-if="chemical.info.state != 'compound'"
            class="mt-2 w-full flex"
          >
            <div class="mr-2 inline-block flex-none">
              Product number:
            </div>
            <input
              class="flex-grow w-full chemical-input-fields"
              placeholder="Enter product #"
              type="text"
              list="product_number"
              v-model="chemical.info.product_number"
              @change="updateChemicalInfo($event, 'product_number')"
              @input="updateAutoCompleteCandidates($event, 'product_number')"
            />
            <datalist id="product_number">
              <option
                v-for="(product_number,
                $product_numberID) of get_product_number_list"
                :key="$product_numberID"
                :value="product_number"
              ></option>
            </datalist>
          </div>

          <!-- STATE -->
          <div class="flex mt-2 w-full">
            <div class="mr-2 inline-block flex-none">
              State:
            </div>
            <input
              class="flex-grow w-full chemical-input-fields"
              placeholder="Choose type"
              type="text"
              :value="chemical.info.state"
              list="state"
              @change="updateChemicalInfo($event, 'state')"
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
            class="flex mt-2 w-full"
            v-if="chemical.info.property.length >= 1"
          >
            <div class="justify-start flex-grow-0 mr-2">History:</div>
            <div class="flex-grow w-full italic">
              {{ list_property(chemical) }}
            </div>
          </div>

          <!-- INFOS -->
          <div class="mt-3">
            <div v-if="chemical.info.state === 'solid'">
              <ChemicalSolid :this_chemical="chemical" />
            </div>
            <div v-else-if="chemical.info.state === 'solution'">
              <ChemicalSolution :this_chemical="chemical" />
            </div>
            <div v-else-if="chemical.info.state === 'liquid'">
              <ChemicalLiquid :this_chemical="chemical" />
            </div>
            <div v-else-if="chemical.info.state === 'gas'">
              <ChemicalGas :this_chemical="chemical" />
            </div>
            <div v-else-if="chemical.info.state === 'compound'">
              <ChemicalCompound :this_chemical="chemical" />
            </div>
          </div>
        </div>

        <!-- SIDEBAR -->
        <div class="justify-end w-1/4 flex-grow-0">
          <AppActionbar />
          <div class="italic text-gray-600 mt-4">
            Write note:
            <textarea
              class="chemical-input-fields w-full"
              :value="chemical.info.additional"
              placeholder="add notes"
              rows="3"
              @change="updateChemicalInfo($event, 'additional')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import AppActionbar from "@/components/AppActionbar"
import sigma from "@/data/sample_sigmaaldrich"
import data_autocomplete from "@/data/data_autocomplete"
import axios from "axios"

export default {
  components: {
    AppActionbar,
  },
  data() {
    return {
      names: data_autocomplete.names,
      formulas: data_autocomplete.formulas,
      products: data_autocomplete.products,
      temp_name: null,
      temp_state: null,
      sigma_obj: sigma.sigmaaldrich,
      chem_list: [],
      product_number_list: [],
    }
  },
  computed: {
    ...mapGetters(["getTask"]),
    chemical() {
      return this.getTask(this.$route.params.id)
    },
    get_chem_list() {
      var formatted = this.chem_list
      return formatted.sort()
    },
    get_state_list() {
      var formatted = ["solid", "solution", "liquid", "gas"]
      return formatted
    },
    get_product_number_list() {
      var formatted = this.product_number_list
      return formatted.sort()
    },
  },
  methods: {
    updateChemicalInfo(e, key) {
      var value_
      if (key === "display") {
        value_ = e.target.value.split("-")[0]
        this.temp_name = e.target.value
      } else {
        value_ = e.target.value
        this.temp_state = e.target.value
      }

      this.$store.commit("UPDATE_CHEMICAL", {
        chemical: this.chemical.info,
        key,
        value: value_,
      })
    },
    list_property(chem) {
      var list = ""
      let i = 0
      while (i < chem.info.property.length) {
        if (i == chem.info.property.length - 1) {
          list = list + chem.info.property[i]
          i++
        } else {
          list = list + chem.info.property[i] + ", "
          i++
        }
      }

      return list
    },
    updateAutoCompleteCandidates(e, key) {
      // console.log("updateAutoCompleteCandidates.")
      // console.log(e)
      let address = null
      let chemical = this
      let flag = false
      let result = []
      switch (key) {
        case "name":
          address =
            "http://49.50.167.33:3000/product/" + key + "/" + e.target.value
          axios
            .get(address, {})
            .then(function(response) {
              let data = response.data
              // console.log(data.length)
              if (data.length != 0) {
                result = result.concat(data).sort((a, b) => {
                  return a.indexOf(e.target.value) - b.indexOf(e.target.value)
                })
                if (flag) {
                  chemical.chem_list = result
                }
                flag = true
              }
            })
            .catch(function(error) {
              console.log(error)
            })
            .finally(function() {})

          address =
            "http://49.50.167.33:3000/product/" +
            "formula" +
            "/" +
            e.target.value
          axios
            .get(address, {})
            .then(function(response) {
              let data = response.data
              if (data.length != 0) {
                result = result.concat(data).sort((a, b) => {
                  return a.indexOf(e.target.value) - b.indexOf(e.target.value)
                })
                if (flag) {
                  chemical.chem_list = result
                }
                flag = true
              }
            })
            .catch(function(error) {
              console.log(error)
            })
            .finally(function() {})

          break
        case "product_number":
          address =
            "http://49.50.167.33:3000/product/" + key + "/" + e.target.value
          axios
            .get(address, {})
            .then(function(response) {
              let data = response.data
              // console.log(data.length)
              if (data.length != 0) {
                result = result.concat(data).sort((a, b) => {
                  return a.indexOf(e.target.value) - b.indexOf(e.target.value)
                })
                chemical.product_number_list = result
              }
            })
            .catch(function(error) {
              console.log(error)
            })
            .finally(function() {})

          break
        default:
      }
    },
    // toFormula(name) {
    //   let num = name.match(/\d/g)
    //   let sub = []
    //   if (num) {
    //     for (const n of name) {
    //       if (n.match(/\d/)) {
    //         sub.push("<sub>" + n.toString() + "</sub>")
    //       } else {
    //         sub.push(n)
    //       }
    //     }
    //     // console.log(sub)
    //     return sub.join("")
    //   } else {
    //     return name
    //   }
    // },
  },
}
</script>

<style lang="css">
.chemical-view {
  @apply relative flex flex-row  mx-auto bg-white p-4 inset-0 text-left rounded shadow overflow-y-auto;
  margin-top: 7%;
  max-width: 800px;
  min-height: 0%;
  max-height: 80%;
}
.chemical-input-fields {
  @apply bg-teal-100;
}
</style>
