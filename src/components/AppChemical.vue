<template>
  <div>
    <ul class="flex justify-between">
      <li class="mr-2">
        <span>🧪</span>
        <span>
          <span v-if="!chemical.additional">
            <div
              class="inline-block mb-0"
              v-for="(ingredient, $ingredientIndex) in chemical.ingredients"
              :key="$ingredientIndex"
            >
              <div
                class="inline-block font-bold"
                v-html="toFormula(ingredient.name)"
              ></div>
              <div
                v-if="$ingredientIndex + 1 < ingredientLength"
                class="inline-block font-bold"
              >
                +
              </div>
            </div>
          </span>
          <span class="font-bold" v-else>{{ chemical.additional }}</span>
        </span>

        <div class="inline-block" v-if="chemical.ingredients.length === 1">
          <div class="inline-block ml-2 italic">
            {{ per_state_elements(chemical.ingredients[0])[0] }}
          </div>
          <div class="inline-block ml-2 underline">
            {{ per_state_elements(chemical.ingredients[0])[1] }}
          </div>
          <div
            class="inline-block text-sm font-bold italic ml-2"
            v-if="
              (chemical.ingredients[0].property != null) &
                (chemical.ingredients[0].property.length >= 1)
            "
          >
            {{ show_property(chemical.ingredients[0].property) }}
          </div>
        </div>
      </li>
      <li class="mr-2">
        <button
          class="inline-block text-sm"
          @click.stop="removeChemical(note, columnIndex, taskIndex)"
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
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(["note"]),
    summedvolume() {
      let sv = 0
      for (const chem of this.chemical.ingredients) {
        if (chem.v_unit === "uL") {
          sv += chem.volume * 0.001
        } else if (chem.v_unit === "mL") {
          sv += chem.volume
        }
      }
      return sv
    },
    ingredientLength() {
      return this.chemical.ingredients.length
    },
  },
  methods: {
    removeChemical(note, columnIndex, taskIndex) {
      this.$store.commit("REMOVE_TASK", { note, columnIndex, taskIndex })
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
        // console.log(sub)
        return sub.join("")
      } else {
        return name
      }
    },
    per_state_elements(chemical_) {
      var state = chemical_.state
      var italic = ""
      var underline = ""
      if (state == "solid") {
        underline = underline + chemical_.weight + " " + chemical_.w_unit
      } else if (state == "solution") {
        italic = italic + chemical_.concentration + " " + chemical_.c_unit
        underline = underline + chemical_.volume + " " + chemical_.v_unit
      } else if (state == "gas") {
        italic = italic + chemical_.pressure + " " + chemical_.p_unit
        underline = underline + chemical_.volume + " " + chemical_.v_unit
      } else if (state == "liquid") {
        underline = underline + chemical_.volume + " " + chemical_.v_unit
      } else {
        properties = "wrong"
      }

      var properties = [italic, underline]
      return properties
    },
    show_property(property) {
      var pt = ""
      for (let i = 0; i < property.length; i++) {
        pt = pt + property[i] + " "
      }
      return pt
    },
  },
}
</script>

<style scoped></style>
