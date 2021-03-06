<template>
  <div class="process-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div class="input-fields text-3xl font-black">
        🔬
        <input
          type="text"
          placeholder="Choose Process"
          class="process-input-fields"
          :value="process.info.name"
          list="method"
          @change="updateProcessProperty($event, 'info')"
        />
        <datalist id="method">
          <option
            v-for="(func, $funcID) of getlist"
            :key="$funcID"
            :value="func"
          ></option>
        </datalist>
      </div>

      <div class="flex w-full mt-3">
        <div class="justify-start flex-grow mr-10">
          <div v-if="process.info.name === 'Mix'">
            <ProcessMix :this_process="process" />
          </div>
          <div v-else-if="process.info.name === 'Stirring'">
            <ProcessStirring :this_process="process" />
          </div>
          <div v-else-if="process.info.name === 'Heat'">
            <ProcessHeat :this_process="process" />
          </div>
          <div v-else-if="process.info.name === 'Water bath'">
            <ProcessWaterbath :this_process="process" />
          </div>
          <div v-else-if="process.info.name === 'Cooling'">
            <ProcessCooling :this_process="process" />
          </div>
          <div v-else-if="process.info.name === 'Filtering'">
            <ProcessFiltering :this_process="process" />
          </div>
          <div v-else-if="process.info.name === 'Add'">
            <ProcessAdd :this_process="process" />
          </div>
          <div v-else-if="process.info.name === 'Inject'">
            <ProcessInject :this_process="process" />
          </div>
        </div>

        <div class="justify-end w-1/4 flex-grow-0">
          <div v-show="process.info.name !== ''">
            <AppActionbar />
            <div class="italic text-gray-600 mt-4">
              Write note:
              <textarea
                class="process-input-fields w-full"
                :value="process.additional"
                placeholder="add notes"
                rows="3"
                @change="updateProcessInfo($event, 'additional')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import processDB from "@/data/sample_process"
import processTemplate from "@/data/process_template"
import AppActionbar from "@/components/AppActionbar"

export default {
  components: { AppActionbar },
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
    getlist() {
      var funcs = []
      for (let i = 0; i < this.processFuncs.length; i++) {
        funcs.push(this.processFuncs[i].name)
      }
      return funcs
    },
    prevChemicals() {
      const procId = this.process.id

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
    updateProcessProperty(e, key) {
      const procTemp = processTemplate.templates.find(
        ({ name }) => name === e.target.value
      )
      const _procTemp = JSON.stringify(procTemp)
      let data = JSON.parse(_procTemp).info

      if (e.target.value === "Mix") {
        let ins = []
        for (const c of this.prevChemicals) {
          let d = JSON.stringify({ id: c.id, amount: 0 })
          ins.push(JSON.parse(d))
        }
        data.inputs = ins
      }

      this.$store.commit("UPDATE_PROCESS", {
        process: this.process,
        key,
        value: data,
      })
    },
    updateProcessInfo(e, key) {
      this.$store.commit("UPDATE_PROCESS", {
        process: this.process,
        key,
        value: e.target.value,
      })
    },
  },
}
</script>

<style lang="css">
.process-view {
  @apply relative flex flex-row mt-32 mx-auto bg-white p-4 inset-0 text-left rounded shadow overflow-y-auto;
  max-width: 700px;
  min-height: 0%;
  max-height: 80%;
}
.process-input-fields {
  @apply bg-indigo-100;
}
</style>
