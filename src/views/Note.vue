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
          >
            {{ chemical.chemical_formula }}
            {{ chemical.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      newFlaskName: ""
    }
  },
  computed: {
    ...mapState(["note"]),
    isChemOpen() {
      return this.$route.name === "flask"
    }
  }
}
</script>

<style lang="css">
.note {
  @apply p-4 bg-gray-300 h-screen w-2/4 overflow-auto;
}
.flask-bg {
  background: rgba(0, 0, 0, 0.5);
}
.flask {
  @apply bg-green-200 p-2 mb-4 text-left shadow rounded;
}
.chemical {
  @apply bg-purple-100 p-1 mb-3 text-left shadow rounded;
}
</style>
