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
              Ha