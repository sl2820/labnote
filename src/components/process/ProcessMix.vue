<template>
  <div>
    <div>
      <div v-for="(chem, $chemID) of inputsFromPrevs" :key="$chemID + 'chem'">
        <div class="flex w-full">
          <div class="inline-block flex-none">
            <div v-if="chem.nickname">{{ chem.nickname }}:</div>
            <div v-else>{{ chem.display }}:</div>
          </div>
          <input
            class="flex-grow w-full process-input-fields"
            type="text"
            v-model="chem.amount"
            @change="updateInputsAmount()"
          />
        </div>

        <div class="text-secondary ml-2 mt-n2 mb-2 italic">
          {{ chem.property.join(", ") }}
        </div>
      </div>
    </div>

    <div class="mt-2 flex w-full">
      <div class="mr-2 inline-block flex-none">
        Gradually:
      </div>
      <input
        class="mt-1"
        type="checkbox"
        id="gradually"
        v-model="this_process.info.gradually"
        @change="updateProcessInfo($event, 'gradually')"
      />
    </div>

    <div class="mt-2 flex w-full">
      <div class="mr-2 inline-block flex-none">
        Time:
      </div>
      <input
        type="text"
        class="flex-grow w-full process-input-fields"
        v-model="this_process.info.time"
        @change="updateProcessInfo($event, 'time')"
      />
    </div>

    <AppButton class="my-6 bg-teal-400 rounded-sm" @click.native="makeOutput()"
      >Make Output</AppButton
    >
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import { uuid } from "@/utils"
import AppButton from "@/components/AppButton"
import templates from "@/data/new_templates"

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
      new_chemical: templates.new_chemical,
    }
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
    inputsFromPrevs() {
      const p_inputs = this.this_process.info.inputs
      let assigned_inputs = []

      for (const chem of this.prevChemicals) {
        if (p_inputs.find(({ id }) => id === chem.id) != undefined) {
          assigned_inputs.push({
            id: chem.id,
            amount: p_inputs.find(({ id }) => id === chem.id).amount,
            display: chem.info.display,
            nickname: chem.info.nickname,
            property: chem.info.property,
          })
        } else {
          assigned_inputs.push({
            id: chem.id,
            amount: "",
            display: chem.info.display,
            nickname: chem.info.nickname,
            property: chem.info.property,
          })
        }
      }
      return assigned_inputs
    },
  },

  methods: {
    updateInputsAmount() {
      let data = []
      for (const ifp of this.inputsFromPrevs) {
        // const _a = Number(ifp.amount)
        const _a = ifp.amount
        if (_a !== null) {
          data.push({ id: ifp.id, amount: _a })
        }
      }
      this.$store.commit("UPDATE_PROCESS", {
        process: this.this_process.info,
        key: "inputs",
        value: data,
      })
    },
    updateProcessInfo(e, key) {
      this.$store.commit("UPDATE_PROCESS", {
        process: this.this_process.info,
        key,
        value: e.target.value,
      })
    },
    makeOutput() {
      const _data = JSON.stringify(this.new_chemical.info)
      let data = JSON.parse(_data)

      let _display = []
      for (const item of this.inputsFromPrevs) {
        data.sources.push({ id: item.id, amount: item.amount })
        if (item.amount != 0) {
          if (item.nickname != null) {
            _display.push(item.nickname)
          } else {
            _display.push(item.display)
          }
        }
      }
      data.display = _display.join(" + ")
      data.state = "compound"
      data.property = ["mixed"]
      data = JSON.stringify(data)

      const this_column = this.getColumn(this.$route.params.id)
      const new_index = this_column.tasks.indexOf(this.this_process) + 1
      var id = uuid()
      this.$store.commit("CREATE_OUTPUT", {
        id: id,
        columnID: this_column.id,
        index: new_index,
        data,
      })
      this.$router.push({ name: "note" })
    },
    // latestChemicals(chemicals){
    //   let new_chemicals = []
    //나중에 필요할 수도
    //
    //
    //   return new_chemicals
    // },
  },
}
</script>

<style></style>
