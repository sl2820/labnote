import Vue from "vue"
import Vuex from "vuex"
import experiment from "../experiment"
import { saveStatePlugin } from "../utils"

Vue.use(Vuex)

const note = JSON.parse(localStorage.getItem("note")) || experiment

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    note
  },
  getters: {
    getFlask(state) {
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
  mutations: {}
})
