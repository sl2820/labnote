<template>
  <div>
    <div class="mt-6">
      <!-- <div
        v-for="(chem, $chemID) of this_process.info.inputs"
        :key="$chemID + 'chem'"
      > -->
      <div v-for="(chem, $chemID) of inputsFromPrevs" :key="$chemID + 'chem'">
        <div v-if="chem.nickname" class="inline-block">
          {{ chem.nickname }}
        </div>
        <div v-else class="inline-block">{{ names(chem.id) }}</div>
        :
        <input
          class="process-input-fields"
          type="number"
          v-model="chem.amount"
          @change="updateInputsAmount()"
        />
      </div>
    </div>

    <div>
      <div class="inline-block mt-4">Gradually:</div>
      <input
        type="checkbox"
        id="gradually"
        class="ml-2"
        v-model="this_process.info.gradually"
        @change="updateProcessInfo($event, 'gradually')"
      />
    </div>
    <div>
      <div class="inline-block">Time:</div>
      <input
        type="number"
        class="process-input-fields"
        v-model="this_process.info.time"
        @change="updateProcessInfo($event, 'time')"
      />
    </div>
    <!-- <div class="mt-6">
      <div v-for="(value, key, index) in getDetails" :key="index">
        <span class="mr-2">{{ key }}:</span>
        <input class="process-input-fields" v-model="getDetails[key]" />
      </div>
    </div> -->

    <AppButton class="my-6 bg-teal-400 rounded-sm" @click.native="makeOutput()"
      >Make Output</AppButton
    >
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import { uuid } from "@/utils"
import processDB from "@/data/sample_process"
import AppButton from "@/components/AppButton"

export default {
  components: { AppButton },
  props: {
    this_process: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      processFuncs: processDB.functions,
    }
  },
  computed: {
    ...mapGetters(["getTask", "getColumn"]),
    ...mapState(["note"]),
    process() {
      return this.getTask(this.$route.params.id)
    },
    inputsFromPrevs() {
      const p_inputs = this.this_process.info.inputs
      let assigned_inputs = []

      for (const chem of this.prevChemicals) {
        if (p_inputs.find(({ id }) => id === chem.id) != undefined) {
          assigned_inputs.push({
            id: chem.id,
            amount: p_inputs.find(({ id }) => id === chem.id).amount,
            nickname: chem.nickname,
          })
        } else {
          assigned_inputs.push({
            id: chem.id,
            amount: 0,
            nickname: chem.nickname,
          })
        }
      }
      return assigned_inputs
    },
    prevChemicals() {
      const procId = this.this_process.id

      let taskIds = []
      for (const column of this.note.columns) {
        for (const task of column.tasks) {
          taskIds.push(task.id)
        }
      }

      let chemicals = []
      for (const column of this.note.columns) {
        for (const task of column.tasks) {
          if (taskIds.indexOf(procId) < taskIds.indexOf(task.id)) {
            break
          }
          if (task.type === "chemical") {
            chemicals.push(task)
          }
        }
      }
      return chemicals
    },
    // getDetails() {
    //   // DEPRECATED FUNCTION
    //   const info = this.this_process.info
    //   const keys = Object.keys(info)
    //   const deletion = ["name", "inputs", "chem_for", "chem_to", "output"]
    //   let details = {}
    //   for (let k of keys) {
    //     if (deletion.indexOf(k) === -1) {
    //       details[k] = info[k]
    //     }
    //   }
    //   return details
    // },
  },
  methods: {
    names(this_id) {
      let names = []
      const ingrs = this.getTask(this_id).ingredients
      for (const ingr of ingrs) {
        names.push(ingr.name)
      }
      return names.join(" + ")
    },
    updateInputsAmount() {
      let data = []
      for (const ifp of this.inputsFromPrevs) {
        const _a = Number(ifp.amount)
        if (_a !== 0) {
          data.push({ id: ifp.id, amount: _a })
        }
      }
      this.$store.commit("UPDATE_PROCESS", {
        process: this.this_process.info,
        key: "inputs",
        value: data,
      })
    },
    makeOutput() {
      // console.log("Make Output button clicked!");
      let ingredients = []
      for (const i of this.this_process.info.inputs) {
        let ingrs = this.getTask(i.id).ingredients
        for (const ingr of ingrs) {
          const _s = JSON.stringify(ingr)
          let data = JSON.parse(_s)
          data.id = uuid()
          // data.volume = i.amount
          data.volume = null
          data.weight = null
          data.pressure = null
          if (i.amount > 0) {
            ingredients.push(data)
          }
        }
      }

      const this_column = this.getColumn(this.$route.params.id)
      const new_index = this_column.tasks.indexOf(this.this_process) + 1
      var id = uuid()
      this.$store.commit("CREATE_OUTPUT", {
        id: id,
        columnID: this_column.id,
        index: new_index,
        ingr: ingredients,
      })
      this.$router.push({ name: "note" })
    },
  },
}
</script>

<style></style>
