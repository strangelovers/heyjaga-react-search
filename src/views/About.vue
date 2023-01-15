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
        their computers to help validate and timestamp tr