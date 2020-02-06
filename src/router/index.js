import Vue from "vue"
import VueRouter from "vue-router"
import Note from "../views/Note.vue"
import Chemical from "../views/Chemical.vue"
import Process from "../views/Process.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "note",
    component: Note,
    children: [
      {
        path: "chemical/:id",
        name: "chemical",
        component: Chemical
      },
      {
        path: "process/:id",
        name: "process",
        component: Process
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
