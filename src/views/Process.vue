<template>
  <div class="process-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <!-- <div class="text-2xl font-black">{{ process.details.method }}</div> -->
      <div class="text-2xl font-black">
        <input
          type="text"
          :value="process.details.method"
          list="method"
          @change="updateProcessProperty($event, 'method')"
        />
        <datalist id="method">
          <option v-for="(func, $funcID) of getlist" :key="$funcID" :value="func"></option>
        </datalist>
      </div>

      <!-- <div>Inputs: {{ inputs }}</div> -->
      <div>
        <div v-for="(chem, $chemID) of prevChemicals" :key="$chemID">
          <input
            type="checkbox"
            :id="chem.id"
            :value="chem.id"
            :checked="checkedChems[chem.id]"
            @change="updateProcessInputs($event, 'inputs')"
            @input="updateSelected($event)"
          />
          <label :for="chem.id">{{ chem.id }}</label>
        </div>
      </div>

      <div v-if="process.details.reactive">
        <div>Method: {{ process.details.detail }}</div>
        <div>Instrument: {{ process.details.instrument }}</div>
        <div>RPM: {{ process.details.rpm }}</div>
        <div>Temperature: {{ process.details.temperature }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import processDB from "@/data/sample_process";

export default {
  data() {
    return {
      processFuncs: processDB.functions,
      selectedChems: []
    };
  },
  computed: {
    ...mapGetters(["getTask"]),
    ...mapState(["note"]),
    process() {
      return this.getTask(this.$route.params.id);
    },
    prevChemicals() {
      const procId = this.$route.params.id;
      let taskIds = [];
      for (const t of this.note.tasks) {
        taskIds.push(t.id);
      }
      let chemicals = [];
      for (const task of this.note.tasks) {
        if (taskIds.indexOf(procId) < taskIds.indexOf(task.id)) {
          break;
        }
        if (task.type === "chemical") {
          chemicals.push(task);
        }
      }
      return chemicals;
    },
    inputs() {
      const ids = this.process.inputs;
      let names = [];
      for (const i of ids) {
        for (const c of this.note.tasks) {
          if (c.id === i) {
            for (const ingre in c.ingredients) {
              names.push(c.ingredients[ingre].name);
            }
          }
        }
      }
      return names.join(", ");
    },
    getlist() {
      var funcs = [];
      for (let i = 0; i < this.processFuncs.length; i++) {
        funcs.push(this.processFuncs[i].name);
      }
      return funcs;
    },
    checkedChems() {
      let chems = {};
      for (const ch of this.prevChemicals) {
        for (const iId of this.process.inputs) {
          if (ch.id === iId) {
            chems[ch.id] = true;
          }
        }
      }
      // console.log("checkedChems():", chems);
      return chems;
    }
  },
  methods: {
    updateProcessProperty(e, key) {
      this.$store.commit("UPDATE_PROCESS", {
        process: this.process.details,
        key,
        value: e.target.value
      });
    },
    updateProcessInputs(e, key) {
      // this.selected = this.process.inputs;
      console.log("updateProcessInputs");
      this.$store.commit("UPDATE_PROCESS", {
        process: this.process,
        key,
        value: this.selectedChems
      });
    },
    updateSelected(e) {
      console.log("updateSelected");
      let chemitem = e.target.value;
      if (this.selectedChems.includes(chemitem)) {
        let i = this.selectedChems.indexOf(chemitem);
        this.selectedChems.splice(i, 1);
      } else {
        this.selectedChems.push(chemitem);
      }
      console.log(this.selectedChems);
    }
  }
};
</script>

<style scoped>
.process-view {
  @apply relative flex flex-row my-32 mx-auto bg-white p-4 inset-0 text-left rounded shadow;
  max-width: 600px;
  min-height: 0%;
}
</style>
