import Vue from "vue"
import "./plugins/fontawesome"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import "./assets/tailwind.css"
// import VueRx from "vue-rx"
import vuetify from "./plugins/vuetify"
// import "vuetify/dist/vuetify.min.css"

import upperFirst from "lodash/upperFirst"
import camelCase from "lodash/camelCase"

const requireComponent = require.context(
  // The relative path of the components folder
  "./components/process",
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /App[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  )
  // Register component globally
  Vue.component(componentName, componentConfig.default || componentConfig)
})

// Vue.use(VueRx)
Vue.use(vuetify)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
