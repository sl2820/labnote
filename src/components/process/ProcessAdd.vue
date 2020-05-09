<template>
  <div>
    <div>
      <div>
        <button class="chem_for_to" @click="chem_for_show = !chem_for_show">
          From
        </button>
      </div>
      <div v-if="chem_for_show" transition="expand">
        <div>
          <div class="inline-block">Set amount:</div>
          <input
            type="text"
            class="process-input-fields"
            v-model="this_process.info.chem_for.amount"
            @change="updateAmount($event, 'amount', 'chem_for')"
          />
        </div>
        <div v-for="(chem, $chemID) of prevChemicals" :key="$chemID + 'chem'">
          <div class="flex w-full">
            <input
              class="inline-block"
              type="radio"
              v-model="chosen_for"
              name="chosen_for"
              :value="chem.id"
              @change="updateProcessInfoChemfor_to($event, 'id', 'chem_for')"
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
    </div>

    <div class="mt-2">
      <div>
        <button class="chem_for_to" @click="chem_to_show = !chem_to_show">
          To
        </button>
      </div>
      <div v-if="chem_to_show" transition="expand">
        <div>
          <div class="inline-block">Set amount:</div>
          <input
            type="text"
            class="process-input-fields"
            v-model="this_process.info.chem_to.amount"
            @change="updateAmount($event, 'amount', 'chem_to')"
          />
        </div>
        <div v-for="(chem, $chemID) of prevChemicals" :key="$chemID + 'chem'">
          <div class="flex w-full">
            <input
              class="inline-block"
              type="radio"
              v-model="chosen_to"
              name="chosen_to"
              :value="chem.id"
              @change="updateProcessInfoChemfor_to($event, 'id', 'chem_to')"
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

    <div class="mt-2 flex w-full">
      <div class="mr-2 inline-block flex-none">
        Heating:
      </div>
      <input
        type="checkbox"
        id="heating"
        class="mt-1"
        v-model="this_process.info.heating"
        @change="updateProcessInfo($event, 'heating')"
      />
    </div>

    <div class="mt-2 flex w-full">
      <div class="mr-2 inline-block flex-none">
        Gradually:
      </div>
      <input
        type="checkbox"
        id="gradually"
        class="mt-1"
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
import processDB from "@/data/sample_process"
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
      chem_for_show: false,
      chem_to_show: false,
      chosen_for: this.this_process.info.chem_for.id,
      chosen_to: this.this_process.info.chem_to.id,
      processFuncs: processDB.functions,
      new_chemical: templates.new_chemical_edited,
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
  },

  methods: {
    updateAmount(e, key, to_for) {
      // console.log(e.target.value, to_for)
      if (to_for === "chem_for") {
        this.$store.commit("UPDATE_PROCESS", {
          process: this.this_process.info.chem_for,
          key,
          value: e.target.value,
        })
      } else {
        this.$store.commit("UPDATE_PROCESS", {
          process: this.this_process.info.chem_to,
          key,
          value: e.target.value,
        })
      }
    },
    updateProcessInfoChemfor_to(e, key, to_for) {
      if (to_for === "chem_for") {
        this.$store.commit("UPDATE_PROCESS", {
          process: this.this_process.info.chem_for,
          key,
          value: e.target.value,
        })
      } else {
        this.$store.commit("UPDATE_PROCESS", {
          process: this.this_process.info.chem_to,
          key,
          value: e.target.value,
        })
      }
    },
    makeOutput() {
      const _data = JSON.stringify(this.new_chemical.info)
      let data = JSON.parse(_data)

      let _distplay = []
      const cf = this.getTask(this.chosen_for).info
      if (cf.nickname != null) {
        _distplay.push(cf.nickname)
      } else {
        _distplay.push(cf.display)
      }
      const ct = this.getTask(this.chosen_to).info
      if (ct.nickname != null) {
        _distplay.push(ct.nickname)
      } else {
        _distplay.push(ct.display)
      }
      data.display = _distplay.join(" + ")
      data.sources = [
        this.this_process.info.chem_for,
        this.this_process.info.chem_to,
      ]
      data.state = "compound"
      data.property = ["added"]
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

<style>
.chem_for_to {
  @apply bg-green-400 rounded-full inline-flex text-white px-4 py-2;
}
/* always present */
.expand-transition {
  transition: all 0.5s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter,
.expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}
</style>
