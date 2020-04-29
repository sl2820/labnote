import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import project from "@/data/sample_project"
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
    CREATE_COLUMN(state, { data }) {
      note.columns.push(data)
    },
    CREATE_TASK(state, { columnID, data }) {
      let targetColumn = note.columns.find(({ id }) => id === columnID)
      const _data = JSON.parse(data)
      targetColumn.tasks.push(_data)
    },
    CREATE_OUTPUT(state, { id, columnID, index, ingr }) {
      let targetColumn = note.columns.find(({ id }) => id === columnID)
      targetColumn.tasks.splice(index, 0, {
        id: id,
        type: "chemical",
        ingredients: ingr,
      })
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
    SAVE_PROJECT(state, { data }) {
      data = note

      // load data
      let user_id = data.user_id
      let project_id = data.id
      let tasks = data.tasks

      for (let i = 0, max = tasks.length; i < max; i++) {
        let d = {
          project: project_id,
          order: i,
          author: user_id,
          type: (function() {
            if (tasks[i].type == "chemical") {
              return "chemical"
            } else if (tasks[i].type == "process") {
              return "process"
            } else {
              // console.log(">>>>>>>>>>>>>>" + tasks[i].type)
              return "err"
            }
          })(),
          con: (function() {
            if (tasks[i].type == "chemical") {
              return tasks[i].ingredients
            } else if (tasks[i].type == "process") {
              return tasks[i].info
            } else {
              console.log("err")
            }
          })(),
        }

        console.log(d)

        //<<<<<<< HEAD
        //        axios
        //          .post("http://49.50.167.33:3000/task/tasks", d)
        //          .then(function() {
        //            console.log("saved successfully")
        //            alert("saved successfully")
        //          })
        //          .catch(function(error) {
        //            // alert(error);
        //            console.log("error---")
        //            console.log(error)
        //          })
        //      }
        //      // MOVE_TASK(state, { fromTaskIndex, toTaskIndex }) {
        //      //   const taskList = state.note.tasks
        //      //   const taskToMove = taskList.splice(fromTaskIndex, 1)[0]
        //      //   taskList.splice(toTaskIndex, 0, taskToMove)
        //      // }
        //=======
        axios
          .post("http://49.50.167.33:3000/task/tasks", d)
          .then(function() {
            console.log("saved successfully")
          })
          .catch(function(error) {
            // alert(error);
            console.log("error---")
            console.log(error)
          })
      }
      alert("saved successfully")
      // MOVE_TASK(state, { fromTaskIndex, toTaskIndex }) {
      //   const taskList = state.note.tasks
      //   const taskToMove = taskList.splice(fromTaskIndex, 1)[0]
      //   taskList.splice(toTaskIndex, 0, taskToMove)
      // }
      //>>>>>>> server
    },
    LOAD_PROJECT(projectID) {
      axios
        .get("http://49.50.167.33:3000/task/tasks/" + projectID, {})
        .then(function(response) {
          let data = response.data
          let output = {}
          output.user_id = data[0].author
          output.id = data[0].project
          output.tasks = []

          for (let i = 0, max = data.length; i < max; i++) {
            let task = {}
            task.type = data[i].type
            task.order = data[i].order
            if (task.type == "chemical") {
              task.ingredients = data[i].con
            } else if (task.type == "process") {
              task.info = data[i].con
            }

            output.tasks.push(task)
          }

          console.log(output)
          return output
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {})
    },
  },
})
