<template>
  <div>
    <ul class="flex justify-between">
      <li class="mr-2">
        🔬
        <div class="inline-block font-bold mr-4">{{ process.info.name }}</div>

        <!-- <div class="inline-block" v-if="Object.keys(process.info).includes('inputs')">{{ inputs }}</div>
        <div
          class="inline-block"
          v-if="Object.keys(process.info).includes('chem_for')"
        >{{ chem_for }}</div>
        <div
          class="inline-block"
          v-if="Object.keys(process.info).includes('chem_to')"
        >➡️{{ chem_to }}</div>-->
      </li>
      <li class="mr-2">
        <button class="inline-block text-sm" @click.stop="removeProcess(note, taskIndex)">✖️</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    process: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(["note"]),
    inputs() {
      let ids = [];
      for (const i of this.process.info.inputs) {
        ids.push(i);
      }
      let names = [];
      for (const i of ids) {
        for (const c of this.note.tasks) {
          if (c.id === i) {
            for (const j of c.ingredients) {
              names.push(j.name);
            }
          }
        }
      }
      return names.join(" ➕");
    },
    chem_for() {
      let cid = this.process.info.chem_for.id;
      let name = "";
      for (const c of this.note.tasks) {
        if (c.id === cid) {
          for (const j of c.ingredients) {
            name = j.name;
          }
        }
      }
      return name;
    },
    chem_to() {
      let cid = this.process.info.chem_to.id;
      let name = "";
      for (const c of this.note.tasks) {
        if (c.id === cid) {
          for (const j of c.ingredients) {
            name = j.name;
          }
        }
      }
      return name;
    },
    details() {
      let k = Object.keys(this.process.info);
      const del_ = ["name", "inputs", "chem_for", "chem_to", "output"];
      k = k.filter(item => !del_.includes(item));
      console.log(k);
      return "";
    }
  },
  methods: {
    removeProcess(note, taskIndex) {
      this.$store.commit("REMOVE_TASK", { note, taskIndex });
    }
  }
};
</script>

<style scoped></style>
