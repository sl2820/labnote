<template>
  <div>
    <div>
      <div class="mt-2 flex w-full">
        <div class="mr-2 inline-block flex-none">
          Amount:
        </div>
        <input
          class="flex-grow w-full chemical-input-fields"
          placeholder="Enter amount"
          type="text"
          :value="this_chemical.info.amount"
          @change="updateChemicalInfo($event, 'amount')"
        />
      </div>

      <div class="mt-2 text-sm">
        <div>
          Source info
        </div>
        <div
          v-for="(source, $sourceIndex) of this_chemical.info.sources"
          :key="$sourceIndex"
        >
          <div class="inline-block" v-if="getTask(source.id).info.nickname">
            {{ getTask(source.id).info.nickname }}
          </div>
          <div class="inline-block" v-else>
            {{ getTask(source.id).info.display }}
          </div>
          : {{ source.amount }}
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
