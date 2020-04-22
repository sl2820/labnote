import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import project from "@/data/sample_project_3"
import { saveStatePlugin } from "../utils"

Vue.use(Vuex)

// const note = JSON.parse(localStorage.getItem("note")) || experiment
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
  },
  mutations: {
    CREATE_TASK(state, { columnID, data }) {
      let targetColumn = note.columns.find(({ id }) => id === columnID)
      targetColumn.tasks.push(data)
    },
    CREATE_OUTPUT(state, { id, index, ingr }) {
      note.tasks.splice(index, 0, {
        id: id,
        type: "chemical",
        ingredients: ingr,
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
