

<script>
import { Bar } from "vue-chartjs";
import { mapGetters } from "vuex";

export default {
  extends: Bar,
  props: ["id", "cryptoFromTable"],

  computed: {
    ...mapGetters(["singleCrypto"]),
    name() {
      return this.singleCrypto[this.id].name;
    },
    priceNow() {
      return this.cryptoFromTable.quote.USD.price;
    },
    price1h() {
      return (
        this.priceNow -
        this.priceNow * (this.cryptoFromTable.quote.USD.