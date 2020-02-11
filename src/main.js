import Vue from "vue"
import "./plugins/fontawesome"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./assets/tailwind.css"
// import VueRx from "vue-rx"
import vuetify from "./plugins/vuetify"
// import "vuetify/dist/vuetify.min.css"

// Vue.use(VueRx)
Vue.use(vuetify)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
