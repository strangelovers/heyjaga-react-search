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
        .database()
        .ref("chat")
        .push(obj);
      this.message = "";
    }
  },
  computed: {
    ...mapGetters(["logged"])
  },
  // watch: {
  //   logged: function(value) {
  //     if (value) {
  //       console.log(value);
  //       this.getMessages();
  //     } else {
  //       this.messages = [];
  //       this.message = "";
  //     }
  //   }
  // },
  created() {
    this.getMessages();
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
.container {
  position: absolute;
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  padding: 0;
}

.form {
  display: flex;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-top: 10px;
  position: fixed;
  bottom: 0;
  /* background-color: white; */
  width: 100%;
}
.form > input[type="text"] {
  flex: 1 1 auto;
  border: 1px solid #695c5c;

  background-color: white;
  color: #695c5c;
}

input {
  border: 1px solid white;
  padding: 5px;
}
img {
  border-radius: 50%;
  margin-right: 5px;
}

.chatroom {
  height: 500px;
  width: auto;
  border: 1px solid none;
  margin-top: 10px;
  overflow-y: auto;
}

.message {
  width: auto;
  border: 1px solid white;
  border-radius: 20px;
  margin: auto;
  margin: 3px;
  list-style: none;
  word-break: break-all;
}

p.name {
  font-size: 1.3em;
  display: inline;
  margin-right: 5px;
}
p.text {
  display: block;
}

/* transition: background-color 0.5s; */

/*position: relative;*/

/* SPINNER */
#spinner {
  visibility: visible;
  width: 80px;
  height: 80px;
  border: 2px solid #f3f3f3;
  border-top: 3px solid #cffcfc;
  border-radius: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: spin 1s infinite linear;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.col {
  padding: 0px !important;
}
</style>