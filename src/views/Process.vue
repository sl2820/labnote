<template>
  <div class="process-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div class="text-2xl font-black">
        <input
          type="text"
          :value="process.info.name"
          list="method"
          @change="updateProcessProperty($event, 'method')"
        />
        <datalist id="method">
          <option v-for="(func, $funcID) of getlist" :key="$funcID" :value="func"></option>
        </datalist>
      </div>

      <div class="mt-6 bg-teal-200">
        (inputs)
        <div v-for="(chem, $chemID) of prevChemicals" :key="$chemID">
          <input
            type="checkbox"
            class="w-6"
            :id="chem.id"
            :value="chem.id"
            :checked="checkedChems[chem.id]"
            @change="updateProcessInputs($event, 'inputs')"
            @input="updateSelected($event)"
          />
          <label :for="chem.id">
            <span v-for="(ingr, $ingrID) of chem.ingredients" :key="$ingrID">+ {{ ingr.name }}</span>
          </label>
        </div>
      </div>

      <div class="mt-6 bg-gray-200">
        (details for {{ process.info.name }})
        <!-- <div v-for="(detail, $detailID) of getInfoList" :key="$detailID">{{ detail }}:</div> -->
        <div v-for="(value, key, index) in getDetails" :key="index">
          <span class="mr-2">{{ key }}:</span>
          <input v-model="getDetails[key]" />
        </div>
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
    getlist() {
      var funcs = [];
      for (let i = 0; i < this.processFuncs.length; i++) {
        funcs.push(this.processFuncs[i].name);
      }
      return funcs;
    },
    checkedChems() {
      let chems = {};
      let ids = [];
      for (const i of this.process.info.inputs) {
        ids.push(i.id);
      }

      for (const ch of this.prevChemicals) {
        for (const iId of ids) {
          if (ch.id === iId) {
            chems[ch.id] = true;
          }
        }
      }
      return chems;
    },
    getInfoList() {
      const name = this.process.info.name;
      const del_ = ["name", "inputs", "chem_for", "chem_to", "output"];
      let p = [];
      for (let i = 0; i < this.processFuncs.length; i++) {
        if (this.processFuncs[i].name === name) {
          p = Object.keys(this.processFuncs[i]);
          p = p.filter(item => !del_.includes(item));
        }
      }
      console.log(p);
      return p;
    },
    getDetails() {
      const info = this.process.info;
      // console.log(info);
      const keys = Object.keys(info);
      const deletion = ["name", "inputs", "chem_for", "chem_to", "output"];
      let details = {};
      for (let k of keys) {
        if (deletion.indexOf(k) === -1) {
          details[k] = info[k];
        }
      }
      return details;
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
      this.$store.commit("UPDATE_PROCESS", {
        process: this.process,
        key,
        value: this.selectedChems
      });
    },
    updateSelected(e) {
      let chemitem = e.target.value;
      if (this.selectedChems.includes(chemitem)) {
        let i = this.selectedChems.indexOf(chemitem);
        this.selectedChems.splice(i, 1);
      } else {
        this.selectedChems.push(chemitem);
      }
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
