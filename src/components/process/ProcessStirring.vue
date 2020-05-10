<template>
  <div>
    <div>
      <div v-for="(chem, $chemID) of prevChemicals" :key="$chemID + 'chem'">
        <div class="flex w-full">
          <input
            class="inline-block mr-2"
            type="radio"
            v-model="chosen"
            name="chosen"
            :value="chem.id"
            @change="updateProcessInfoChemfor($event, 'id')"
          />
          <div>
            <div v-if="chem.info.nickname">{{ chem.info.nickname }}</div>
            <div v-else>{{ chem.info.display }}</div>
          </div>
          <div class="text-secondary italic ml-2">
            {{ chem.info.property.join(", ") }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2 flex w-full">
      <div class="mr-2 inline-block flex-none">
        RPM:
      </div>
      <input
        type="text"
        class="flex-grow w-full process-input-fields"
        v-model="this_process.info.rpm"
        @change="updateProcessInfo($event, 'rpm')"
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
        Heating:
      </div>
      <input
        type="checkbox"
        id="gradually"
        class="mt-1"
        v-model="this_process.info.heating"
        @change="updateProcessInfo($event, 'heating')"
      />
    </div>

    <AppButton class="my-4 bg-teal-400 rounded-sm" @click.native="makeOutput()"
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
      data.property.push("after stirring")
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
