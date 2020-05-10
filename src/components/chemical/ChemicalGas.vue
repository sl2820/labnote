<template>
  <div>
    <div class="">
      <div>
        <div class="mt-2 flex w-full">
          <div class="mr-2 inline-block flex-none">
            Pressure:
          </div>
          <input
            class="flex-grow w-full chemical-input-fields"
            placeholder="Enter pressure"
            type="text"
            :value="this_chemical.info.pressure"
            @change="updateChemicalInfo($event, 'pressure')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  props: {
    this_chemical: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["getTask"]),
    chemical() {
      return this.getTask(this.$route.params.id)
    },
  },

  methods: {
    updateChemicalInfo(e, key) {
      let found = this.this_chemical

      this.$store.commit("UPDATE_CHEMICAL", {
        chemical: found.info,
        key,
        value: e.target.value,
      })
    },
  },
}
</script>

<style lang="css"></style>
