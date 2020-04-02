<template>
  <div>
    <!-- <div>{{ this_process.info }}</div> -->
    <!-- <div>{{ prevChemicals }}</div> -->
    <div v-for="(chem, $chemID) of prevChemicals" :key="$chemID">
      <input type="radio" v-model="chosen" name="chosen" :value="chem.id" />
      {{ chem.id }}
    </div>
    chosen: {{ chosen }}
    <div>rpm</div>
    <div>time</div>
    <div>heating</div>
  </div>
</template>

<script>
//     output: {
//     name: "",
//     property: "after stirring"
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return { chosen: null };
  },
  props: {
    this_process: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getTask"]),
    ...mapState(["note"]),
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
    }
  }
};
</script>

<style></style>
