<template>
  <div>
    <ul class="flex justify-between">
      <li class="mr-2">
        🧪
        <!-- <div v-if="chemical.ingredients.length === 1">
          <div v-html="toFormula(chemical.ingredients[0].name)"></div>
          <div>
            {{ chemical.ingredients[0].volumn }}
            {{ chemical.ingredients[0].v_unit }}
          </div>
          <div>
            {{ chemical.ingredients[0].concentration }}
            {{ chemical.ingredients[0].c_unit }}
          </div>
        </div>
        <div v-else>
          <div
            class="inline-block mb-0"
            v-for="(ingredient, $ingredientIndex) in chemical.ingredients"
            :key="$ingredientIndex"
          >
            <div v-html="toFormula(ingredient.name)"></div>
            <div>{{ ingredient.volumn }}{{ ingredient.v_unit }}</div>
          </div>
        </div> -->
        <div
          class="inline-block mb-0"
          v-for="(ingredient, $ingredientIndex) in chemical.ingredients"
          :key="$ingredientIndex"
        >
          <div
            class="inline-block mr-1"
            v-html="toFormula(ingredient.name)"
          ></div>
          <div
            class="inline-block mr-1 italic"
            v-if="chemical.ingredients.length === 1"
          >
            {{ ingredient.concentration }}{{ ingredient.c_unit }}
          </div>
          <div class="inline-block mr-1">
            {{ ingredient.volumn }}{{ ingredient.v_unit }}
          </div>
        </div>
      </li>
      <li class="mr-2">
        <button
          class="inline-block text-sm"
          @click.stop="removeChemical(note, chemicalIndex)"
        >
          ✖️
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  props: {
    chemical: {
      type: Object,
      required: true
    },
    chemicalIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(["note"])
  },
  methods: {
    removeChemical(note, chemicalIndex) {
      this.$store.commit("REMOVE_CHEMICAL", { note, chemicalIndex })
    },
    toFormula(name) {
      let num = name.match(/\d/g)
      let sub = []
      if (num) {
        for (const n of name) {
          if (n.match(/\d/)) {
            sub.push("<sub>" + n.toString() + "</sub>")
          } else {
            sub.push(n)
          }
        }
        return sub.join("")
      } else {
        return name
      }
    },
    summedVolumn() {}
  }
}
</script>

<style scoped></style>
