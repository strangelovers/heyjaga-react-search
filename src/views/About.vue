<template>
  <div class="about">
    <h2 class="font-italic font-weight-medium">The History of Cryptocurrency</h2>
    <p>
      A cryptocurrency (or crypto currency) is a digital asset designed to work as a medium of exchange that
      uses strong cryptography to secure financial transactions, control the creation of additional units, and verify the
      transfer of assets. Cryptocurrencies use decentralized control as opposed to centralized digital currency and central
      banking systems. The decentralized control of each cryptocurrency works through distributed ledger technology, typically
      a blockchain, that serves as a public financial transaction database.
      Bitcoin, first released as open-source software in 2009, is generally considered the first decentralized cryptocurrency.
      Since the release of bitcoin, over 4,000 altcoins (alternative variants of bitcoin, or other cryptocurrencies) have been created.
    </p>

    <div class="button" @click="readMore = !readMore" v-show="!readMore">Read More...</div>
    <template v-if="readMore">
      <h2 class="font-italic font-weight-medium">Arcitecture</h2>
      <p>
        Decentralized cryptocurrency is produced by the entire cryptocurrency system collectively, at a rate which is defined
        when the system is created and which is publicly known. In centralized banking and economic systems such as the Federal Reserve
        System, corporate boards or governments control the supply of currency by printing units of fiat money or demanding additions to
        digital banking ledgers. In case of decentralized cryptocurrency, companies or governments cannot produce new units, and have
        not so far provided backing for other firms, banks or corporate entities which hold asset value measured in it. The underlying
        technical system upon which decentralized cryptocurrencies are based was created by the group or individual known as Satoshi
        Nakamoto. As of May 2018, over 1,800 cryptocurrency specifications existed.[24] Within a cryptocurrency system, the safety,
        integrity and balance of ledgers is maintained by a community of mutually distrustful parties referred to as miners: who use
        their computers to help validate and timestamp transactions, adding them to the ledger in accordance with a particular
        timestamping scheme. Most cryptocurrencies are designed to gradually decrease production of that currency, placing a cap on the
        total amount of that currency that will ever be in circulation.[25] Compared with ordinary currencies held by financial
        institutions or kept as cash on hand, cryptocurrencies can be more difficult for seizure by law enforcement. This difficulty is
        derived from leveraging cryptographic technologies.
      </p>
      <h2 class="font-italic font-weight-medium">Mining</h2>
      <p>
        In cryptocurrency networks, mining is a validation of transactions. For this effort, successful miners obtain new cryptocurrency
        as a reward. The reward decreases transaction fees by creating a complementary incentive to contribute to the processing power of
        the network. The rate of generating hashes, which validate any transaction, has been increased by the use of specialized machines
        such as FPGAs and ASICs running complex hashing algorithms like SHA-256 and Scrypt. This arms race for cheaper-yet-efficient
        machines has been on since the day the first cryptocurrency, bitcoin, was introduced in 2009. With more people venturing into the
        world of virtual currency, generating hashes for this validation has become far more complex over the years, with miners having to
        invest large sums of money on employing multiple high performance ASICs. Thus the value of the currency obtained for finding a hash
        often does not justify the amount of money spent on setting up the machines, the cooling facilities to overcome the enormous amount
        of heat they produce, and the electricity required to run them.Some miners pool resources, sharing their processing power over a
        network to split the reward equally, according to the amount of work they contributed to the probability of finding a block.
        A "share" is awarded to members of the mining pool who present a valid partial proof-of-work.
      </p>
      <a href="https://en.wikipedia.org/wiki/Cryptocurrency" target="_blank">
        <h2>More Information</h2>
      </a>
    </template>
    <br />
    <router-link to="/" tag="button">
      <v-btn outlined dark>Back to Home</v-btn>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "about",
  props: {
    msg: String
  },
  data() {
    return {
      readMore: false
    };
  }
};
</script>
<style scoped>
.about {
  margin: 15px;
}
p {
  text-align: justify;
}

h2 {
  margin-top: 20px;
  color: white;
}
.about a {
  text-decoration: none;
  color: black;
}
.about a:hover {
  text-decoration: underline;
}
</style>