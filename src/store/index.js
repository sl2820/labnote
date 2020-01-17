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
        for (const row of state.note.rows) {
          for (const info of row.product_infos) {
            if (info.id === id) {
              return info
            }
          }
        }
      }
    }
  },
  mutations: {}
})
