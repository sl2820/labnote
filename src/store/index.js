import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import project from "@/data/template_empty"
import { saveStatePlugin } from "../utils"

Vue.use(Vuex)

const note = JSON.parse(localStorage.getItem("note")) || project

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  // modules: {
  //   Note
  // },
  state: {
    note,
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.note.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    },
    getColumn(state) {
      return (id) => {
        for (const column of state.note.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return column
            }
          }
        }
      }
    },
  },
  mutations: {
    CREATE_COLUMN(state, { column }) {
      const data = JSON.parse(column)
      note.columns.push(data)
    },
    CREATE_TASK(state, { columnID, data }) {
      let targetColumn = note.columns.find(({ id }) => id === columnID)
      const _data = JSON.parse(data)
      targetColumn.tasks.push(_data)
    },
    CREATE_OUTPUT(state, { id, columnID, index, data }) {
      let targetColumn = note.columns.find(({ id }) => id === columnID)
      const info = JSON.parse(data)
      targetColumn.tasks.splice(index, 0, {
        id: id,
        type: "chemical",
        additional: "",
        info,
      })
    },
    UPDATE_NOTE(state, { note, key, value }) {
      Vue.set(note, key, value)
    },
    UPDATE_COLUMN(state, { column, key, value }) {
      Vue.set(column, key, value)
    },
    UPDATE_TEST_ID(state, { test_id }) {
      note.id = test_id
    },
    UPDATE_TASK(state, { task, key, value }) {
      Vue.set(task, key, value)
    },
    UPDATE_CHEMICAL(state, { chemical, key, value }) {
      Vue.set(chemical, key, value)
    },
    UPDATE_PROCESS(state, { process, key, value }) {
      Vue.set(process, key, value)
    },
    UPDATE_MEMO(state, { memo, key, value }) {
      Vue.set(memo, key, value)
    },
    REMOVE_COLUMN(state, { note, columnIndex }) {
      note.columns.splice(columnIndex, 1)
    },
    REMOVE_TASK(state, { note, columnIndex, taskIndex }) {
      note.columns[columnIndex].tasks.splice(taskIndex, 1)
    },
    LOAD_TEMPLATE(state, { data }) {
      state.note = data
    },
    SAVE_PROJECT(state, { data }) {
      data = JSON.parse(data)
      console.log(data)
      console.log(" - - - - - ")
      // load data
      let project_id = data.id
      let user_id = data.user_id
      let columns = data.columns
      let data_to_save = []

      for (let i = 0, max = columns.length; i < max; i++) {
        let column_id = columns[i].id
        let column_name = columns[i].name
        let tasks = columns[i].tasks
        for (let j = 0, maxj = tasks.length; j < maxj; j++) {
          let d = {
            project_id: project_id,
            author: user_id,
            task_id: tasks[j].id,
            col_idx: i,
            col_id: column_id,
            col_name: column_name,
            order: j,
            type: (() => {
              switch (tasks[j].type) {
                case "chemical":
                  return "chemical"
                case "process":
                  return "process"
                case "memo":
                  return "memo"
                default:
                  return "err"
              }
            })(),
            nickname: (() => {
              switch (tasks[j].type) {
                case "chemical":
                  return tasks[j].nickname || ""
                case "process":
                  return tasks[j].nickname || ""
                case "memo":
                  return ""
                default:
                  return "err"
              }
            })(),
            additional: (() => {
              switch (tasks[j].type) {
                case "chemical":
                  return tasks[j].additional || ""
                case "process":
                  return tasks[j].additional || ""
                case "memo":
                  return ""
                default:
                  return "err"
              }
            })(),
            content: (() => {
              switch (tasks[j].type) {
                case "chemical":
                  return tasks[j].ingredients
                default:
                  return tasks[j].info
              }
            })(),
          }

          data_to_save.push(d)
        }
      }
      axios
        .post("http://49.50.167.33:3000/task/tasks", data_to_save)
        .then(function() {
          console.log("saved successfully")
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    LOAD_PROJECT(state, { data }) {
      console.log(data)
      axios
        .get("http://49.50.167.33:3000/task/tasks/" + data, {})
        .then(function(response) {
          let respData = response.data
          let output = {}
          output.user_id = respData[0].author
          output.id = respData[0].project_id
          output.columns = []

          let col_num = 0
          let keepIncreasing = true
          while (keepIncreasing) {
            let col_data = respData.filter((datum) => datum.col_idx == col_num)
            if (col_data.length == 0) {
              keepIncreasing = false
              break
            }

            let col = {}
            col.id = col_data[0].col_id
            col.name = col_data[0].col_name
            col.tasks = col_data.sort((a, b) => a.order - b.order)

            for (let i = 0, max = col.tasks.length; i < max; i++) {
              delete col.tasks[i].createdAt
              delete col.tasks[i].updatedAt
              delete col.tasks[i].project_id
              delete col.tasks[i].author
              delete col.tasks[i].col_id
              delete col.tasks[i].col_idx
              delete col.tasks[i].col_name

              col.tasks[i].id = col.tasks[i].task_id
              delete col.tasks[i].task_id
              delete col.tasks[i].order

              switch (col.tasks[i].type) {
                case "chemical":
                  col.tasks[i].ingredients = col.tasks[i].content
                  break
                default:
                  col.tasks[i].info = col.tasks[i].content
              }
              delete col.tasks[i].content
            }

            output.columns.push(col)
            col_num += 1
          }
          state.note = output //update current note
          console.log(output)
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {})
    },
  },
})
