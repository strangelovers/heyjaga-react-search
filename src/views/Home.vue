
<template>
  <div class="home">
    <div>
      <v-icon left dark>mdi-magnify</v-icon>
      <input id="search" type="search" required v-model="keyword" />
      <label class="label-icon" for="search"></label>
    </div>
    <h1 class="font-italic font-weight-bold">Top Ranked Cryptos</h1>
    <div v-if="loading" id="spinner"></div>
    <MyTable />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MyTable from "@/components/MyTable.vue";

export default {
  data() {
    return {
      keyword: ""
    };
  },
  watch: {
    keyword: function() {
      console.log("searchInput changed to " + this.keyword);
      this.$store.dispatch("searchedCrypto", this.keyword);
    }
  },

  computed: {
    ...mapGetters(["allCryptos", "addToSearch", "getSearch", "loading"]),
    getCryptos() {
      return this.addToSearch(this.keyword);
    }
  },

  methods: {
    ...mapActions(["getData", "searchedCrypto"]),
    search() {
      this.$store.dispatch("searchedCrypto", this.keyword);
    }
  },
  components: { MyTable },

  created() {
    this.getData();
    this.keyword = this.getSearch;
  }
};
</script>

<style scoped>
#search {
  border: 1px solid white;
  width: 40%;
  padding: 2px 10px;
  margin: 20px auto 10px;
}
h1 {
  margin: 10px 0;
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