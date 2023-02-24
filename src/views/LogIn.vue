<template>
  <div>
    <div class="chat">
      <v-container class="container" v-show="!logged">
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
    <!-- <v-container> -->
    <!-- <v-row sm-6 xs-12 align="center">
      <v-col v-show="!logged">
        <v-btn @click="login" class="elevation-5">Login</v-btn>
        <h1 class="font-italic font-weight-medium">Crypto Chatroom</h1>
        <v-row>
          <v-col>
            <p>
              Would you like to connect to other traders of cryptocurrency?
              Have ideas or questions regarding mining of cryptos or architecture of the industry?
            </p>
            <p>Our secure chat gives you access to thousands of cryptolovers just like you!</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>-->

    <!-- <v-col>
      <v-btn @click="logOut" v-if="logged" class="elevation-5">LogOut</v-btn>
    </v-col>-->

    <div v-if="logged" class="chatroom" v-chat-scroll="{always: false, smooth: true}">
      <div v-if="loading" id="spinner"></div>
      <div class="message" v-for="message in messages" :key="message.id">
        <v-col class="bubble right">
          <img :src="message.foto" alt="profile" width="25px" rounded />
          <p class="name">{{ message.name}}</p>
          <span>{{ message.currentdate}}</span>
          <p class="text">{{message.text}}</p>
        </v-col>
      </div>
    </div>

    <div class="form" v-if="logged">
      <input v-model="message" type="text" placeholder="enter message" justify="space-around" />
      <v-btn
        v-if="logged"
        @click="sendMessage"
        class="elevation-5"
        large
        justify="space-around"
      >Send</v-btn>
    </div>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <!-- </v-container> -->
  </div>
</template>

<script>
import firebase from "firebase";
import VueChatScroll from "vue-chat-scroll";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      //logged: false,
      message: "",
      messages: [],
      loading: false,
      currentdate: "",
      snackbar: false,
      text: "Please enter your message"
    };
  },
  methods: {
    getDate() {
      var todaydate = new Date();
      var hours = todaydate.getHours();
      var minutes = todaydate.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      this.currentdate =
        todaydate.getMonth() +
        1 +
        "/" +
        todaydate.getDate() +
        "/" +
        todaydate.getFullYear() +
        "  " +
        strTime;

      // this.currentdate = todaydate.toString();
      // this.currentdate = this.currentdate.substring(0, 10);
      // console.log(todaydate.getHours());
      //this.todaydate.substring(0, 10);
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
          this.getMessages();
        })
        .catch(err => {
          alert(err);
          this.loading = false;
        });
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(user => {
          this.$store.commit("logged", false);
          this.messages = [];
          this.message = "";
          this.$router.push("/login");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getMessages() {
      this.loading = true;
      firebase
        .database()
        .ref("chat")
        .on("value", data => {
          this.messages = data.val();
          this.loading = false;
        });
      console.log("gfgfgf");
    },

    sendMessage() {
      if (this.logged == false) {
        alert("you are not logged in");
        this.message = "";
        return;
      } else if (this.logged == true && this.message.length == 0) {
        this.snackbar = true;
        return;
      }
      this.getDate();
      console.log(firebase.auth().currentUser);
      let obj = {
        text: this.message,
        name: firebase.auth().currentUser.displayName,
        foto: firebase.auth().currentUser.photoURL,
        currentdate: this.currentdate
      };
      firebase
        .database(