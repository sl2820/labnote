<template>
  <div>
    <div class="mt-6">
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
        <div>
          <div v-for="(chem, $chemID) of prevChemicals" :key="$chemID + 'chem'">
            <input
              class="inline-block"
              type="radio"
              v-model="chosen_for"
              name="chosen_for"
              :value="chem.id"
              @change="updateProcessInfoChemfor_to($event, 'id', 'chem_for')"
            />
            <div v-if="chem.nickname" class="inline-block ml-1">
              {{ chem.nickname }}
            </div>
            <div v-else class="inline-block ml-1">{{ names(chem.id) }}</div>
            <div
              v-if="print_history(chem.id)"
              class="text-secondary ml-1 mt-n2 italic inline-block"
            >
              ({{ print_history(chem.id) }})
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3">
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
        <div>
          <div v-for="(chem, $chemID) of prevChemicals" :key="$chemID + 'chem'">
            <input
              class="inline-block"
              type="radio"
              v-model="chosen_to"
              name="chosen_to"
              :value="chem.id"
              @change="updateProcessInfoChemfor_to($event, 'id', 'chem_to')"
            />
            <div v-if="chem.nickname" class="inline-block ml-1">
              {{ chem.nickname }}
            </div>
            <div v-else class="inline-block ml-1">{{ names(chem.id) }}</div>
            <div
              v-if="print_history(chem.id)"
              class="text-secondary ml-1 mt-n2 italic inline-block"
            >
              ({{ print_history(chem.id) }})
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="inline-block mt-4 mb-1">Stirring:</div>
      <input
        type="checkbox"
        id="stirring"
        class="ml-2"
        v-model="this_process.info.stirring"
        @change="updateProcessInfo($event, 'stirring')"
      />
    </div>
    <div>
      <div class="inline-block">Heating:</div>
      <input
        type="checkbox"
        id="heating"
        class="ml-2"
        v-model="this_process.info.heating"
        @change="updateProcessInfo($event, 'heating')"
      />
    </div>
    <div>
      <div class="inline-block">Gradually:</div>
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
      chem_for_show: false,
      chem_to_show: false,
      chosen_for: this.this_process.info.chem_for.id,
      chosen_to: this.this_process.info.chem_to.id,
      processFuncs: processDB.functions,
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
      console.log(e.target.value, to_for)
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
    names(this_id) {
      let names = []
      const ingrs = this.getTask(this_id).ingredients
      for (const ingr of ingrs) {
        names.push(ingr.name)
      }
      return names.join(" + ")
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
      let ingredients = []
      let ingrs = []
      const chem_fors = this.getTask(this.this_process.info.chem_for.id)
        .ingredients
      const chem_tos = this.getTask(this.this_process.info.chem_to.id)
        .ingredients
      ingrs = ingrs.concat(chem_fors, chem_tos)

      for (const ingr of ingrs) {
        const _s = JSON.stringify(ingr)
        let data = JSON.parse(_s)
        data.id = uuid()
        data.volume = null
        data.weight = null
        data.pressure = null
        // data.property.push("after add")
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
      this.$router.push({ name: "note" })
    },
    print_history(this_id) {
      let properties = ""
      const ingrs = this.getTask(this_id).ingredients
      if (ingrs.length > 1) {
        properties = properties + "Compounds"
      } else if (ingrs.length == 1) {
        if (ingrs[0].property[ingrs[0].property.length - 1] == null) {
          properties = properties + ""
        } else {
          properties =
            properties + ingrs[0].property[ingrs[0].property.length - 1]
        }
      } else {
        properties = properties + "Something Wrong"
      }

      return properties
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
