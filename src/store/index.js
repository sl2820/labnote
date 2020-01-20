import Vue from "vue"
import Vuex from "vuex"
import experiment from "../experiment"
import { saveStatePlugin, uuid } from "../utils"

Vue.use(Vuex)

const note = JSON.parse(localStorage.getItem("note")) || experiment

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    note
  },
  getters: {
    getChemical(state) {
      return id => {
        for (const flask of state.note.flasks) {
          for (const chemical of flask.chemicals) {
            if (chemical.id === id) {
              return chemical
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_CHEMICAL(state, { chemicals, name }) {
      chemicals.push({
        name,
        id: uuid(),
        description: ""
      })
    },
    UPDATE_CHEMICAL(state, { chemical, key, value }) {
      // chemical[key] = value
      Vue.set(chemical, key, value)
    },
    MOVE_CHEMICAL(state, { fromChemicals, toChemicals, chemicalIndex }) {
      const chemicalToMove = fromChemicals.splice(chemicalIndex, 1)[0]
      toChemicals.push(chemicalToMove)
    }
  }
})
