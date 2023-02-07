<template>
  <div>
    <div class="chat">
      <v-container class="container" v-show="!logged">
        <h1 class="font-italic font-weight-medium">Crypto Chatroom</h1>
        <v-row sm-6 xs-12 justify="space-around" align="center">
          <v-col>
            <v-btn elevation="5" @click="login">Login</v-btn>
       