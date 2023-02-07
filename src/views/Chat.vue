<template>
  <div class="chat">
    <v-container class="container">
      <h1 class="font-italic font-weight-medium">Crypto Chatroom</h1>
      <v-row sm-6 xs-12 justify="space-around" align="center">
        <v-col>
          <v-btn elevation="5" @click="login">Login</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>
            Would you like to connect to other traders of cryptocurrency?
            Have ideas or questions regarding mining of cryptos or architecture of the industry?
          </p>
          <p>Our secure chat gives you access to thousands of cryptolovers just like you!</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import { mapSetters } from "vuex";

export default {
  name: "chat",
  props: {
    msg: String
  },
  methods: {
    redirectToLog() {
      this.$router.push({ name: "login" });
    },
    login() {
      this.loading = true;
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          console.log(user);
          this.$store.commit("logged", true);
          this.$router.push({ name: "login" });
          this.getMessages();
        })
        .catch(err => {
          alert(err);
          this.loading = false;
        });
    },
    getMessages() {
      this.loading = true;
      firebase
        .database()
        .ref("chat")
        .on("value", data => {
          this.messages = data.val();
          this.$store.dispatch("setMessages", data.val());
          this.loading = false;
        });
      console.log("gfgfgf");
    }
  },
  computed: {
    ...mapGetters(["logged", "chat"])
  }
};
</script>
<style scoped>
h1 {
  margin-top: 30px;
  margin-bottom: 20px;
}
p {
  font-size: 1.2em;
}
.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea,
.theme--light.v-label,
.theme--light.v-input--selection-controls__input {
  color: white !important;
}
</style>