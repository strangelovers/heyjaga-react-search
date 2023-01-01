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
      