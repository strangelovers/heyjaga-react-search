<template>
  <div>
    <v-app-bar app class="navbar">
      <v-toolbar-title>
        <router-link :to="titlelink.route">
          <div>
            <!--<img class="logo" src="../assets/cryptologo.png" alt="cryptologo" srcset />-->
            <h4>{{ titlelink.text}}</h4>
          </div>
        </router-link>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>
      <template>
        <v-toolbar-items class="hidden-xs-only" v-for="(link, index) in links" :key="index">
          <v-btn :to="link.route" text>{{link.text}}</v-btn>
        </v-toolbar-items>
        <v-toolbar-items class="hidden-sm-and-up" v-for="link in links" :key="link.text">
          <v-btn :to="link.route" icon>
            <v-icon>{{ link.icon}}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </template>
      <div class="flex-grow-1"></div>
      <template>
        <router-link v-if="logged" :to="loginlink.route" tag="v-btn">
          <v-btn v-if="logged" @click="logOut" icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </router-link>
        <!-- <router-link v-else :to="links[1].route" tag="v-btn"></router-link> -->
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      // logged: false,
      titlelink: { text: "CRYPTO$PLAY", route: "/" },
      loginlink: { route: "/login" },
      links: [
        { text: "About", route: "/about", icon: "mdi-information" },
        { text: "Chat", route: "/login", icon: "mdi-chat-processing" },
        { text: "Contact", route: "/contact", icon: "mdi-phone" }
      ]
    };
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(user => {
          this.$store.commit("logged", false);
          this.$router.push("/login");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapGetters(["logged"])
  }
};
</script>


<style scoped>
img {
  width: 100px;
  height: 50px;
}
>>> .v-btn__content {
  font-weight: 800;
  font-size: 1.2em;
  font-stretch: expanded;
  color: #052f47;
}
.navbar {
  background-color: #cffcfc !important;
  opacity: 0.8;
}
h4,
a {
  text-decoration: none !important;
  color: #052f47;
}
</style>