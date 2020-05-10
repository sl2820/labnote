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
        <div v-if="chem.nickname" class="inline-block ml-2">
          {{ chem.nickname }}
        </div>
        <div v-else class="inline-block ml-2">{{ names(chem.id) }}</div>
        <div
          v-if="print_history(chem.id)"
          class="text-secondary ml-3 mt-n2 mb-1 italic"
        >
          ({{ print_history(chem.id) }})
        </div>
      </li>
    </ul>

    <div class="mt-2 flex w-full">
      <div class="mr-2 inline-block flex-none">
        Temperature (°C):
      </div>
      <input
        type="text"
        class="flex-grow w-full process-input-fields"
        v-model="this_process.info.temperature"
        @change="updateProcessInfo($event, 'temperature')"
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

    <div class="mt-2 flex w-full">
      <div class="mr-2 inline-block flex-none">
        Stirring:
      </div>
      <input
        type="checkbox"
        id="stirring"
        class="mt-1"
        v-model="this_process.info.stirring"
        @change="updateProcessInfo($event, 'stirring')"
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
import templates from "@/data/new_templates"

export default {
  components: { AppButton },

  data() {
    return {
      chosen: this.this_process.info.chem_for.id,
      new_chemical: templates.new_chemical,
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
      const _data = JSON.stringify(this.getTask(this.chosen).info)
      let data = JSON.parse(_data)
      if (data.nickname != null) {
        data.display = data.nickname
      }
      data.nickname = null
      data.property.push("after heating on an water bath")
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
  },
}
</script>

<style></style>
