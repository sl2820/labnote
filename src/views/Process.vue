<template>
  <div class="process-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <div class="text-2xl font-black">
        <input
          type="text"
          :value="process.info.name"
          list="method"
          @change="updateProcessProperty($event, 'name')"
        />
        <datalist id="method">
          <option v-for="(func, $funcID) of getlist" :key="$funcID" :value="func"></option>
        </datalist>
      </div>

      <div>
        <div v-if="process.info.name === 'Mix'">
          <AppMix :this_process="process"></AppMix>
        </div>
        <div v-else-if="process.info.name === 'Stirring'">
          <AppStirring :this_process="process"></AppStirring>
        </div>
        <div v-else-if="process.info.name === 'Heat'">
          <AppHeat :this_process="process"></AppHeat>
        </div>
        <div v-else-if="process.info.name === 'Water bath'">
          <AppWaterbath :this_process="process"></AppWaterbath>
        </div>
        <div v-else-if="process.info.name === 'Cooling'">
          <AppCooling :this_process="process"></AppCooling>
        </div>
        <div v-else-if="process.info.name === 'Filtering'">
          <AppFiltering :this_process="process"></AppFiltering>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import processDB from "@/data/sample_process";

export default {
  data() {
    return {
      processFuncs: processDB.functions
    };
  },
  computed: {
    ...mapGetters(["getTask"]),
    process() {
      return this.getTask(this.$route.params.id);
    },
    getlist() {
      var funcs = [];
      for (let i = 0; i < this.processFuncs.length; i++) {
        funcs.push(this.processFuncs[i].name);
      }
      return funcs;
    }
  },
  methods: {
    updateProcessProperty(e, key) {
      this.$store.commit("UPDATE_PROCESS", {
        process: this.process.info,
        key,
        value: e.target.value
      });
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
