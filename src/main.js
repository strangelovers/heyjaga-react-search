
import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import VueChatScroll from "vue-chat-scroll";
import VueMoment from "vue-moment";

Vue.config.productionTip = false;
Vue.use(VueChatScroll, VueMoment);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyDGEWppLqEWkVYJ53FX7AJD7cJfAIXUkRI",
      authDomain: "cryptoapp-1a543.firebaseapp.com",
      databaseURL: "https://cryptoapp-1a543.firebaseio.com",
      projectId: "cryptoapp-1a543",
      storageBucket: "",
      messagingSenderId: "537570076503",
      appId: "1:537570076503:web:9f22c74c2d50ea7e000012"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        store.commit("logged", true);
      } else {
        store.commit("logged", false);
      }
    });
  }
}).$mount("#app");