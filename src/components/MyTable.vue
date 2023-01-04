<template>
  <div class="font-weight-medium mytable">
    <v-data-table
      :headers="headers"
      @click:row="getCrypto"
      :items="fixedDecimals"
      :items-per-page="5"
      :mobile-breakpoint="500"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { loadavg } from "os";

export default {
  name: "MyTable",
  data() {
    return {
      headers: [
        { text: "Rank", value: "cmc_rank" },
        {
          text: "Name",
          sortable: false,
          value: "name"
        },
        { text: "Symbol", value: "symbol", sortable: false },
        { text: "Price", value: "quote[USD][price]" },
        { text: "% Change", value: "quote[USD][percent_change_24h]" },

        { text: "Market Cap", value: "quote[USD][market_cap]", sortable: false }
      ]
    };
  },
  methods: {
    getCrypto(item) {
      console.log(item.id);
      this.$router.replace("/cryptoitem/" + item.id);
    }
  },
  computed: {
    ...mapGetters(["allCryptos", "getSearch"]),
    fixedDecimals() {
      let cryptos = this.allCryptos.filter(coin =>
        coin.name.toLowerCase().includes(this.getSearch.toLowerCase())
      );

      let newData = Array.from(cryptos);
      for (var i = 0; i < cryptos