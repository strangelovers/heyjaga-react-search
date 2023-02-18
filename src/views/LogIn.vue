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
      loa