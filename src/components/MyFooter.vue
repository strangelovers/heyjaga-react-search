<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>© 2019 API provided by CoinMarketCap</p>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  margin-top: 30px;
}
</style>
