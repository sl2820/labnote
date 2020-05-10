<template>
  <div>
    <div class="">
      <div>
        <div class="mt-2 flex w-full">
          <div class="mr-2 inline-block flex-none">
            Solvent:
          </div>
          <input
            class="flex-grow w-full chemical-input-fields"
            placeholder="Enter solvent"
            type="text"
            :value="this_chemical.info.solvent"
            @change="updateChemicalInfo($event, 'solvent')"
          />
        </div>

        <div class="mt-2 flex w-full">
          <div class="mr-2 inline-block flex-none">
            Volume:
          </div>
          <input
            class="flex-grow w-full chemical-input-fields"
            placeholder="Enter volume"
            type="text"
            :value="this_chemical.info.volume"
            @change="updateChemicalInfo($event, 'volume')"
          />
        </div>

        <div class="mt-2 flex w-full">
          <div class="mr-2 inline-block flex-none">
            Concentration:
          </div>
          <input
            class="flex-grow w-full chemical-input-fields"
            placeholder="Enter concentration"
            type="text"
            :value="this_chemical.info.concentration"
            @change="updateChemicalInfo($event, 'concentration')"
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
