
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Chat from "./views/Chat.vue";
import Contact from "./views/Contact.vue";
import LogIn from "./views/LogIn.vue";
import CryptoItem from "./views/CryptoItem.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/cryptoitem/:id",
      component: CryptoItem,
      name: "cryptoitem",
      props: true
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact
    },
    {
      path: "/login",
      name: "login",
      component: LogIn
    }
  ]
});