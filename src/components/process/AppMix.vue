<template>
  <div>
    <div>APP MIX</div>
    <div>{{ this_process.info }}</div>

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
      <div v-for="(value, key, index) in getDetails" :key="index">
        <span class="mr-2">{{ key }}:</span>
        <input v-model="getDetails[key]" />
      </div>
    </div>

    <br />
    <AppButton class="bg-teal-400 rounded-sm" @click.native="makeOutput()">Make Output</AppButton>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { uuid } from "@/utils";
import processDB from "@/data/sample_process";
import AppButton from "@/components/AppButton";

export default {
  components: { AppButton },
  props: {
    this_process: {
      type: Object,
      required: true
    }
  },
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
    makeOutput() {
      console.log("Make Output button clicked!");
      var id = uuid();
      this.$store.commit("CREATE_CHEMICAL", {
        id: id
      });
    },
    updateProcessInputs(e, key) {
      this.$store.commit("UPDATE_PROCESS", {
        process: this.process.info,
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

<style></style>
