import Vue from "vue"
import Vuex from "vuex"
// import experiment from "../experiment"
import project from "@/data/sample_project"
import { saveStatePlugin } from "../utils"
// import Note from "./Note";
Vue.use(Vuex)

// const note = JSON.parse(localStorage.getItem("note")) || experiment
const note = JSON.parse(localStorage.getItem("note")) || project

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  // modules: {
  //   Note
  // },
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
    },
    getProcess(state) {
      return id => {
        for (const process of state.note.actions) {
          if (process.id === id) {
            return process
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
    MOVE_CHEMICAL(state, { fromChemicalIndex, toChemicalIndex }) {
      const chemicalList = state.note.components
      const chemcialToMove = chemicalList.splice(fromChemicalIndex, 1)[0]
      chemicalList.splice(toChemicalIndex, 0, chemcialToMove)
    },
    MOVE_PROCESS(state, { fromProcessIndex, toProcessIndex }) {
      const processList = state.note.actions
      const processToMove = processList.splice(fromProcessIndex, 1)[0]
      processList.splice(toProcessIndex, 0, processToMove)
    },
    REMOVE_PROCESS(state, { note, processIndex }) {
      note.actions.splice(processIndex, 1)
    }
  }
})
