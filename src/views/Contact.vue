
<template>
  <div class="contact">
    <v-content v-show="hideOnSubmit" class="form">
      <h1 class="font-italic font-weight-medium">Get In Touch</h1>

      <v-form ref="form" lazy-validation>
        <v-text-field :rules="nameRules" label="Name" dark class="title-1"></v-text-field>

        <v-text-field v-model="email" :rules="nameRules" label="E-mail" required dark></v-text-field>

        <v-text-field label="Question" :rules="nameRules" dark></v-text-field>

        <v-checkbox label="Would you like to receive our newsletter?" dark></v-checkbox>

        <v-btn outlined dark @click="ReverseView">Submit</v-btn>
      </v-form>
    </v-content>
    <span v-show="ThankyouMsg">
      <h2>Thank you for your Input</h2>
      <h3>We will respond to your query within 48 hours</h3>
      <router-link to="/" tag="button" class="button">
        <v-btn outlined dark>Home</v-btn>
      </router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: "contact",

  data() {
    return {
      hideOnSubmit: true,
      ThankyouMsg: false,
      nameRules: [v => v.length >= 3 || "Input should be at least 3 characters"]
    };
  },
  methods: {
    ReverseView() {
      if (this.$refs.form.validate()) {
        (this.hideOnSubmit = false), (this.ThankyouMsg = true);
      }
    }
  }
};
</script>

<style scoped>
.contact {
  margin: 20px;
}
div.contact {
  margin: 20px 20px;
}
button {
  margin-top: 30px;
}
</style>