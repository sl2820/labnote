<template>
  <div class="note">
    <div class="items-start">
      <div
        class="flask"
        v-for="(flask, $flaskIndex) of note.flasks"
        :key="$flaskIndex"
      >
        <div class="flex mb-2 font-bold">
          {{ flask.name }}
        </div>
        <div class="list-reset">
          <div
            class="chemical"
            v-for="(chemical, $chemicalIndex) of flask.chemicals"
            :key="$chemicalIndex"
            @click="goToChemical(chemical)"
          >
            <span class="font-bold">
              {{ chemical.chemical_formula }}
            </span>
            <span class="italic">
              {{ chemical.name }}
            </span>
            <p v-if="chemical.description" class="text-sm">
              {{ chemical.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="chemical-bg" v-if="isChemicalOpen" @click.self="close">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState(["note"]),
    isChemicalOpen() {
      return this.$route.name === "chemical"
    }
  },
  methods: {
    goToChemical(chemical) {
      this.$router.push({ name: "chemical", params: { id: chemical.id } })
    },
    close() {
      this.$router.push({ name: "note" })
    }
  }
}
</script>

<style lang="css">
.note {
  @apply p-4 bg-gray-200 h-screen w-2/4 overflow-auto;
}
.flask {
  @apply bg-gray-300 p-2 mb-4 text-left shadow rounded;
}
.chemical {
  @apply items-center bg-gray-400 p-1 mb-3 text-left shadow rounded;
}
.chemical-bg {
  @apply inset-0 absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
