<template>
  <div>
    <ul class="flex justify-between">
      <li class="mr-2">
        <span>🧪</span>
        <!-- THE NAME OF CHEMICAL (DISPLAY OR NICKNAME) -->
        <span>
          <span v-if="!chemical.info.nickname">
            <div
              class="inline-block mb-0 font-extrabold"
              v-html="toFormula(chemical.info.display)"
            ></div>
          </span>
          <span class="font-bold" v-else>{{ chemical.info.nickname }}</span>
        </span>

        <!-- VOLUME, WEIGHT, CONCENTRATION, PRESSURE -->
        <div class="inline-block ml-2 text-sm text-gray-700">
          <div class="inline-block ml-2 italic">
            {{ per_state_elements(chemical.info)[0] }}
          </div>
          <div class="inline-block ml-2 underline">
            {{ per_state_elements(chemical.info)[1] }}
          </div>
        </div>

        <!-- PROPERTY (PROCESS HISTORY) -->
        <div
          class="inline-block text-xs italic ml-2 text-gray-600"
          v-if="
            (chemical.info.property != null) &
              (chemical.info.property.length === 1)
          "
        >
          {{ chemical.info.property[0] }}
        </div>
        <div
          class="inline-block text-xs italic ml-2 text-gray-600"
          v-else-if="
            (chemical.info.property != null) &
              (chemical.info.property.length > 1)
          "
        >
          {{ show_property(chemical.info.property) }}
        </div>
      </li>
      <li class="mr-2">
        <button
          class="inline-block text-xs"
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
        underline = underline + chemical_.weight
      } else if (state == "solution") {
        italic = italic + chemical_.concentration
        underline = underline + chemical_.volume
      } else if (state == "gas") {
        italic = italic + chemical_.pressure
        underline = underline + chemical_.volume
      } else if (state == "liquid") {
        underline = underline + chemical_.volume
      } else {
        properties = "wrong"
      }

      var properties = [italic, underline]
      return properties
    },
    show_property(property) {
      var pt = ""
      var a = property.length - 1
      // for (let i = 0; i < property.length; i++) {
      pt = pt + property[a] + "..."
      // }
      return pt
    },
  },
}
</script>

<style scoped></style>
