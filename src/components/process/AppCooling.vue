<template>
  <div>
    <ul>
      <li
        class="pr-4"
        v-for="(chem, $chemID) of prevChemicals"
        :key="$chemID + 'chem'"
      >
        <input
          class="inline-block"
          type="radio"
          v-model="chosen"
          name="chosen"
          :value="chem.id"
          @change="updateProcessInfoChemfor($event, 'id')"
        />
        <div class="inline-block ml-2">
          {{ names(chem.id) }}
        </div>
        <div class="inline-block ml-2 italic text-gray-600">
          {{ chem.nickname }}
        </div>
      </li>
    </ul>

    <div>
      <div class="inline-block mt-4">Temperature:</div>
      <input
        type="number"
        class="process-input-fields"
        v-model="this_process.info.temperature"
        @change="updateProcessInfo($event, 'temperature')"
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
    <div>
      <div class="inline-block">Feeding gas:</div>
      <input
        type="text"
        class="process-input-fields"
        v-model="this_process.info.feeding_gas"
        @change="updateProcessInfo($event, 'feeding_gas')"
      />
    </div>

    <br />
    <AppButton class="my-6 bg-teal-400 rounded-sm" @click.native="makeOutput()"
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
    return {
      chosen: this.this_process.info.chem_for.id,
    }
  },
  props: {
    this_process: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getTask", "getColumn"]),
    ...mapState(["note"]),
    process() {
      return this.getTask(this.$route.params.id)
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
    updateProcessInfoChemfor(e, key) {
      this.$store.commit("UPDATE_PROCESS", {
        process: this.this_process.info.chem_for,
        key,
        value: e.target.value,
      })
    },
    makeOutput() {
      let ingredients = []
      const ingrs = this.getTask(this.chosen).ingredients
      for (let ingr of ingrs) {
        let _s = JSON.stringify(ingr)
        let data = JSON.parse(_s)
        data.id = uuid()
        data.property.push("after cooling")
        ingredients.push(data)
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
    },
  },
}
</script>

<style></style>
