import Vue from "vue"
import Vuex from "vuex"
// import experiment from "../experiment"
import project from "@/data/sample_project"
import { saveStatePlugin } from "../utils"

Vue.use(Vuex)

// const note = JSON.parse(localStorage.getItem("note")) || experiment
const note = JSON.parse(localStorage.getItem("note")) || project

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    note
  },
  getters: {
    getChemical(state) {
      return id => {
        for (const chemical of state.note.components) {
          if (chemical.id === id) {
            return chemical
          }
        }
      }
    }
  },
  mutations: {
    CREATE_CHEMICAL(state, { chemicals, nickname, id }) {
      chemicals.push({
        nickname,
        id: id,
        description: "",
        name: "",
        formula: ""
      })
    },
    // REMOVE_CHEMICAL(state, { flask, chemicalIndex }) {
    //   flask.chemicals.splice(chemicalIndex, 1)
    // },
    CREATE_FLASK(state, { name }) {
      state.note.flasks.push({
        name,
        chemicals: []
      })
    },
    REMOVE_CHEMICAL(state, { note, chemicalIndex }) {
      note.components.splice(chemicalIndex, 1)
    },
    UPDATE_CHEMICAL(state, { chemical, key, value }) {
      // chemical[key] = value
      Vue.set(chemical, key, value)
    },
    UPDATE_FLASK(state, { flask, key, value }) {
      Vue.set(flask, key, value)
    },
    // MOVE_CHEMICAL(
    //   state,
    //   { fromChemicals, toChemicals, fromChemicalIndex, toChemicalIndex }
    // ) {
    //   const chemicalToMove = fromChemicals.splice(fromChemicalIndex, 1)[0]
    //   toChemicals.splice(toChemicalIndex, 0, chemicalToMove)
    // },
    // MOVE_FLASK(state, { fromFlaskIndex, toFlaskIndex }) {
    //   const flaskList = state.note.flasks
    //   const flaskToMove = flaskList.splice(fromFlaskIndex, 1)[0]
    //   flaskList.splice(toFlaskIndex, 0, flaskToMove)
    // }
    MOVE_CHEMICAL(state, { fromChemicalIndex, toChemicalIndex }) {
      const chemicalList = state.note.components
      const chemcialToMove = chemicalList.splice(fromChemicalIndex, 1)[0]
      chemicalList.splice(toChemicalIndex, 0, chemcialToMove)
    }
  }
})
