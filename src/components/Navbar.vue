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
   