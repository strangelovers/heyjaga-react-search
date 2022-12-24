<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <MyFooter />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import MyFooter from "@/components/MyFooter";

export default {
  name: "App",
  components: { Navbar, MyFooter },
  data: () => ({})
};
</script>

<style>
#app {
  color: white;
  text-align: center;
  background: url("./assets/newimage2.jpg") fixed;
  background-color: #cccccc;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
}
</style>
