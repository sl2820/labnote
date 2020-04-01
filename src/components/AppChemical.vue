<template>
  <div>
    <ul class="flex justify-between">
      <li class="mr-2">
        🧪
        <div
          class="inline-block mb-0"
          v-for="(ingredient, $ingredientIndex) in chemical.ingredients"
          :key="$ingredientIndex"
        >
          <div class="inline-block font-bold" v-html="toFormula(ingredient.name)"></div>
          <div v-if="$ingredientIndex + 1 < ingredientLength" class="inline-block font-bold">+</div>
        </div>
        <div class="inline-block ml-5 italic">
            {{ chemical.ingredients[0].state }}
        </div>

        <div class="inline-block ml-5 italic" v-if="chemical.ingredients.length === 1">
          {{ chemical.ingredients[0].concentration
          }}{{ chemical.ingredients[0].c_unit }}
        </div>

        <div class="inline-block ml-5 underline">{{ summedVolumn }}mL</div>
      </li>
      <li class="mr-2">
        <button class="inline-block text-sm" @click.stop="removeChemical(note, taskIndex)">✖️</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    chemical: {
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
    summedVolumn() {
      let sv = 0;
      for (const chem of this.chemical.ingredients) {
        if (chem.v_unit === "uL") {
          sv += chem.volumn * 0.001;
        } else if (chem.v_unit === "mL") {
          sv += chem.volumn;
        }
      }
      return sv;
    },
    ingredientLength() {
      return this.chemical.ingredients.length;
    }
  },
  methods: {
    removeChemical(note, taskIndex) {
      this.$store.commit("REMOVE_TASK", { note, taskIndex });
    },
    toFormula(name) {
      let num = name.match(/\d/g);
      let sub = [];
      if (num) {
        for (const n of name) {
          if (n.match(/\d/)) {
            sub.push("<sub>" + n.toString() + "</sub>");
          } else {
            sub.push(n);
          }
        }
        // console.log(sub)
        return sub.join("");
      } else {
        return name;
      }
    }
  }
};
</script>

<style scoped></style>
