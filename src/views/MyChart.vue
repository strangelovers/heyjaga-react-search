

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
        this.priceNow * (this.cryptoFromTable.quote.USD.percent_change_1h / 100)
      );
    },
    price24h() {
      return (
        this.priceNow -
        this.priceNow *
          (this.cryptoFromTable.quote.USD.percent_change_24h / 100)
      );
    },
    price7d() {
      return (
        this.priceNow -
        this.priceNow * (this.cryptoFromTable.quote.USD.percent_change_7d / 100)
      );
    }
  },

  mounted() {
    this.renderChart(
      {
        labels: ["7 days", "24h", "1h", "current"],
        datasets: [
          {
            label: this.name,
            backgroundColor: "#cffcfc",
            data: [this.price7d, this.price24h, this.price1h, this.priceNow]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>

<style>
</style>