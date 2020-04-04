import Vue from "vue"
import Vuex from "vuex"
import project from "@/data/sample_project_empty"
import { saveStatePlugin, uuid } from "../utils"

Vue.use(Vuex)

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
            volume: null,
            v_unit: "",
            concentration: null,
            c_unit: "",
            weight: null,
            w_unit: "g",
            pressure: null,
            p_unit: "Pa",
            property: []
          }
        ]
      })
    },
    CREATE_OUTPUT(state, { id, index, ingr }) {
      note.tasks.splice(index, 0, {
        id: id,
        type: "chemical",
        ingredients: ingr
      })
    },
    CREATE_PROCESS(state, { id }) {
      note.tasks.push({
        id: id,
        type: "process",
        info: {
          name: ""
        }
      })
    },
    UPDATE_CHEMICAL(state, { chemical, key, value }) {
      // chemical[key] = value
      Vue.set(chemical, key, value)
    },
    UPDATE_PROCESS(state, { process, key, value }) {
      Vue.set(process, key, value)
    },
    REMOVE_TASK(state, { note, taskIndex }) {
      note.tasks.splice(taskIndex, 1)
    },
    SAVE_PROJECT(state, { note_data }) {
      console.log(note_data)
    }
    // MOVE_TASK(state, { fromTaskIndex, toTaskIndex }) {
    //   const taskList = state.note.tasks
    //   const taskToMove = taskList.splice(fromTaskIndex, 1)[0]
    //   taskList.splice(toTaskIndex, 0, taskToMove)
    // }
  }
})
