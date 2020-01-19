import Vue from "vue";
import "./plugins/fontawesome";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import AppButton from "./components/AppButton";
import vuetify from "./plugins/vuetify";

Vue.component("AppButton", AppButton);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
