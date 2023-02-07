
<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-col xs-2>
          <router-link to="/" tag="button">
            <v-btn outlined dark>
              <v-icon>mdi-backspace</v-icon>
            </v-btn>
          </router-link>
        </v-col>
        <v-col xs-8>
          <div
            class="title font-italic font-weight-bold"
            v-if="singleCrypto[id]"
          >{{singleCrypto[id].name}}</div>
          <div class="title" v-if="singleCrypto[id]">{{singleCrypto[id].symbol}}</div>
          <img v-if="singleCrypto[id]" v-bind:src="singleCrypto[id].logo" />
        </v-col>
        <v-col xs-2>
          <v-btn outlined dark>
            <select class="button">
              <option value="USD">USD</option>
              <option value="CAD">CAD</option>
              <option value="EUR">EUR</option>
              <option value="DASP">DASP</option>
            </select>
          </v-btn>
        </v-col>
      </v-layout>

      <v-row>
        <v-col xs-12>
          <div
            class="title font-weight-bold"
            v-if="cryptoFromTable.quote"
          >$ {{ cryptoFromTable.quote.USD.price }}</div>
        </v-col>
      </v-row>
      <div v-if="loading" id="spinner"></div>
      <MyChart
        light
        v-if="singleCrypto[id] && cryptoFromTable.quote"
        :singleCrypto="singleCrypto"
        :id="id"
        :cryptoFromTable="cryptoFromTable"
      />

      <v-row>
        <v-col xs-12>
          <div v-if="singleCrypto[id]">{{singleCrypto[id].description}}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h4>
            For more information on
            <span v-if="singleCrypto[id]">{{singleCrypto[id].name}}</span> please refer to below links
          </h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs-4>
          <a
            v-if="singleCrypto[id]"
            v-bind:href="singleCrypto[id].urls.website"
            target="_blank"
            class="font-italic font-weight-medium"
          >WEBSITE</a>
        </v-col>
        <v-col xs-4>
          <a
            v-if="singleCrypto[id]"
            v-bind:href="singleCrypto[id].urls.reddit"
            target="_blank"
            class="font-italic font-weight-medium"
          >REDDIT</a>
        </v-col>
        <v-col xs-4>
          <a
            v-if="singleCrypto[id]"
            v-bind:href="singleCrypto[id].urls.twitter"
            target="_blank"
            class="font-italic font-weight-medium"
          >TWITTER</a>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
//import axios from "axios";
import MyChart from "./MyChart";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["id"],
  components: { MyChart },

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["singleCrypto", "allCryptos", "loading"]),
    cryptoFromTable() {
      return this.allCryptos.find(crypto => crypto.id == this.id);
    }
  },
  methods: {
    ...mapActions(["getSingleCrypto"])
  },
  created() {
    this.getSingleCrypto(this.id);
  }
};
</script>

<style scoped>
select {
  border: none;
}
div a {
  text-decoration: none;
  color: white;
  font-size: bold;
}
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
</style>