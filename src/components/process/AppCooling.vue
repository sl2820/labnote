<template>
  <div>
    <ul>
      <li
        class="pr-4"
        v-for="(chem, $chemID) of prevChemicals"
        :key="$chemID + 'chem'"
      >
        <input type="radio" v-model="chosen" name="chosen" :value="chem.id" />
        {{ names(chem.id) }}
      </li>
    </ul>

    <div v-for="(value, key, index) in getDetails" :key="index + 'det'">
      <span class="mr-2">{{ key }}:</span>
      <input
        class="process-input-fields"
        v-model="getDetails[key]"
        @change="updateProcessInfo($event, key)"
      />
    </div>
    <div>
      <div class="pr-4">Feeding gas:</div>
      <span
        v-for="(gas, $gasID) in this_process.info.feeding_gas"
        :key="$gasID"
      >
        <input class="process-input-fields" type="text" v-model="gas.name" />
      </span>
    </div>

    <br />
    <AppButton class="bg-teal-400 rounded-sm" @click.native="makeOutput()"
      >Make Output</AppButton
    >
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import { uuid } from "@/utils"
import AppButton from "@/components/AppButton"
export default {
  components: { AppButton },
  data() {
    return { chosen: null }
  },
  props: {
    this_process: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getTask"]),
    ...mapState(["note"]),
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
    getDetails() {
      const info = this.this_process.info
      const keys = Object.keys(info)
      const deletion = [
        "name",
        "inputs",
        "chem_for",
        "chem_to",
        "output",
        "feeding_gas",
      ]
      let details = {}
      for (let k of keys) {
        if (deletion.indexOf(k) === -1) {
          details[k] = info[k]
        }
      }
      return details
    },
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
    updateProcessInfo(e, key) {
      this.$store.commit("UPDATE_PROCESS", {
        process: this.this_process.info,
        key,
        value: e.target.value,
      })
    },
    makeOutput() {
      let ingredients = []
      const ingrs = this.note.tasks.find(({ id }) => id === this.chosen)
        .ingredients
      for (let ingr of ingrs) {
        let _s = JSON.stringify(ingr)
        let data = JSON.parse(_s)
        data.id = uuid()
        data.property.push("after cooling")
        ingredients.push(data)
      }
      const new_index = this.note.tasks.indexOf(this.this_process) + 1
      var id = uuid()
      this.$store.commit("CREATE_OUTPUT", {
        id: id,
        index: new_index,
        ingr: ingredients,
      })
    },
  },
}
</script>

<style></style>
