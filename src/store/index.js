import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import experiment from "../experiment"
import project from "@/data/sample_project_2";
import { saveStatePlugin, uuid } from "../utils";
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
      };
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
      });
    },
    CREATE_PROCESS(state, { id }) {
      note.tasks.push({
        id: id,
        type: "process",
        info: {
          name: ""
        }
      });
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
      
      data = note;

      // load data
      let user_id = data.user_id
      let project_id = data.id
      let tasks = data.tasks

      for(let i = 0, max = tasks.length; i<max; i++) {

          let d = {'project': project_id,
                  'order': i,
                  'author': user_id,
                  'type': function() {
                      if (tasks[i].type == "chemical"){
                          return "chemical";
                      } else if (tasks[i].type == "process") {
                          return "process";
                      } else {
                          // console.log(">>>>>>>>>>>>>>" + tasks[i].type)
                          return "err";
                      }
                  }(),
                  'con': function() {
                      if (tasks[i].type == "chemical") {
                          return tasks[i].ingredients;
                      } else if (tasks[i].type == "process") {
                          return tasks[i].info;
                      } else{
                          console.log("err");
                      }
                  }()
              };
      
          console.log(d);

          axios.post('http://49.50.167.33:3000/task/tasks', d)
                .then(function() {
                    console.log("saved successfully");
                    alert("saved successfully");
                })
                .catch(function (error) {
                    // alert(error);
                    console.log("error---");
                    console.log(error);
                });
      }
    // MOVE_TASK(state, { fromTaskIndex, toTaskIndex }) {
    //   const taskList = state.note.tasks
    //   const taskToMove = taskList.splice(fromTaskIndex, 1)[0]
    //   taskList.splice(toTaskIndex, 0, taskToMove)
    // }
    },
    // LOAD_PROJECT(state, projectID) {

    // }
}});
