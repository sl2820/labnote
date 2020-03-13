import Vue from "vue"
import Vuex from "vuex"
// import experiment from "../experiment"
import project from "@/data/sample_project"
import { saveStatePlugin, uuid } from "../utils"
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
    getTask(state) {
      return id => {
        for (const task of state.note.tasks) {
          if (task.id === id) {
            return task
          }
        }
      }
    }
  },
  mutations: {
    CREATE_CHEMICAL(state, { id }) {
      note.tasks.push({
        id: id,
        type: "chemical",
        ingredients: [
          {
            id: uuid(),
            name: "",
            product_number: "",
            state: "",
            solvent: "",
            volumn: null,
            v_unit: "",
            concentration: null,
            c_unit: ""
          }
        ]
      })
    },
    CREATE_PROCESS(state, { id }) {
      note.tasks.push({
        id: id,
        type: "process",
        inputs: [],
        details: {
          reactive: null,
          method: "",
          detail: "",
          instrument: "",
          rpm: null,
          temperature: null
        },
        output: ""
      })
    },
    CREATE_FLASK(state, { name }) {
      state.note.flasks.push({
        name,
        chemicals: []
      })
    },
    REMOVE_CHEMICAL(state, { note, chemicalIndex }) {
      note.tasks.splice(chemicalIndex, 1)
    },
    UPDATE_CHEMICAL(state, { chemical, key, value }) {
      // chemical[key] = value
      Vue.set(chemical, key, value)
    },
    UPDATE_FLASK(state, { flask, key, value }) {
      Vue.set(flask, key, value)
    },
    // MOVE_TASK(state, { fromTaskIndex, toTaskIndex }) {
    //   const taskList = state.note.tasks
    //   const taskToMove = taskList.splice(fromTaskIndex, 1)[0]
    //   taskList.splice(toTaskIndex, 0, taskToMove)
    // },
    REMOVE_PROCESS(state, { note, processIndex }) {
      note.tasks.splice(processIndex, 1)
    }
  }
})
