import Vue from "vue"
import VueRouter from "vue-router"
import Note from "../views/Note.vue"
import Chemical from "../views/Chemical.vue"
import Process from "../views/Process.vue"
import Memo from "../views/Memo.vue"
import Analysis from "../views/Analysis.vue"

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
        component: Chemical,
      },
      {
        path: "process/:id",
        name: "process",
        component: Process,
      },
      {
        path: "memo/:id",
        name: "memo",
        component: Memo,
      },
      {
        path: "analysis/:id",
        name: "analysis",
        component: Analysis,
      },
    ],
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
