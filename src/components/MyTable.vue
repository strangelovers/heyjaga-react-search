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
      for (var i = 0; i < cryptos.length; i++) {
        newData[i].quote.USD.price = +cryptos[i].quote.USD.price.toFixed(2);
        newData[i].quote.USD.percent_change_24h = +cryptos[
          i
        ].quote.USD.percent_change_24h.toFixed(2);

        newData[i].quote.USD.market_cap =
          +cryptos[i].quote.USD.market_cap.toString().slice(0, 3) + "B";
      }
      return newData;
    }
  }
};
</script>

<style scoped>
>>> .theme--light.v-data-table thead tr th {
  color: black;
  font-weight: 400;
}
.mytable {
  margin-top: 30px;
  width: 100%;
  padding: 10px;
  opacity: 0.6;

  color: white !important;
}
.v-data-table td {
  font-size: 1.2em;
}
</style>