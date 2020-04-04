<template>
  <div>
    <div class="mt-6 bg-teal-200">
      <div v-for="(chem, $chemID) of this_process.info.inputs" :key="$chemID">
        <span>{{ names(chem.id) }}</span>
        : <input v-model="chem.amount" />
      </div>
    </div>

    <div class="mt-6 bg-gray-200">
      <div v-for="(value, key, index) in getDetails" :key="index">
        <span class="mr-2">{{ key }}:</span>
        <input v-model="getDetails[key]" />
      </div>
    </div>

    <AppButton class="mt-6 bg-teal-400 rounded-sm" @click.native="makeOutput()"
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
      required: true
    }
  },
  data() {
    return {
      processFuncs: processDB.functions,
      inputs: this.this_process.info.inputs
    }
  },
  computed: {
    ...mapGetters(["getTask"]),
    ...mapState(["note"]),
    process() {
      return this.getTask(this.$route.params.id)
    },
    getDetails() {
      const info = this.this_process.info
      const keys = Object.keys(info)
      const deletion = ["name", "inputs", "chem_for", "chem_to", "output"]
      let details = {}
      for (let k of keys) {
        if (deletion.indexOf(k) === -1) {
          details[k] = info[k]
        }
      }
      return details
    }
  },
  methods: {
    names(this_id) {
      let names = []
      const ingrs = this.note.tasks.find(({ id }) => id === this_id).ingredients
      for (const ingr of ingrs) {
        names.push(ingr.name)
      }
      return names.join(" + ")
    },
    makeOutput() {
      // console.log("Make Output button clicked!");
      let ingredients = []
      for (const i of this.this_process.info.inputs) {
        let ingrs = this.note.tasks.find(({ id }) => id === i.id).ingredients
        for (const ingr of ingrs) {
          const _s = JSON.stringify(ingr)
          let data = JSON.parse(_s)
          data.id = uuid()
          // data.volumn = i.amount
          data.volumn = null
          if (i.amount > 0) {
            ingredients.push(data)
          }
        }
      }
      const new_index = this.note.tasks.indexOf(this.process) + 1
      var id = uuid()
      this.$store.commit("CREATE_OUTPUT", {
        id: id,
        index: new_index,
        ingr: ingredients
      })
      this.$router.push({ name: "note" })
    }
  }
}
</script>

<style></style>
