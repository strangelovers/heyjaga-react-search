
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  cryptodata: [],
  singleCrypto: {},
  search: "",
  loading: false,
  logged: false,
  chat: []
};

const getters = {
  allCryptos: state => {
    return state.cryptodata;
  },
  singleCrypto: state => state.singleCrypto,
  addToSearch: state => payload => {
    if (payload != "") {
      return state.cryptodata.filter(item => {
        return item.name.toLowerCase().includes(payload.toLowerCase());
      });
    }
  },
  getSearch: state => state.search,
  loading: state => state.loading,
  logged: state => state.logged,
  chat: state => state.chat
};
const actions = {
  getData({ commit }) {
    commit("setLoading", true);

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios
      .get(
        proxyurl +
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        {
          headers: {
            "X-CMC_PRO_API_KEY": "e1eb1f30-5c4e-43aa-be04-4b50df00807a"
          }
        }
      )
      .then(response => {
        console.log(response);
        commit("setCryptos", response.data.data);
        commit("setLoading", false);
      })
      .catch(function(err) {
        console.log(err);
        commit("setLoading", false);
      });
  },
  getSingleCrypto({ commit }, id) {
    commit("setLoading", true);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios
      .get(
        proxyurl +
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=" +
          id,
        {
          headers: {
            "X-CMC_PRO_API_KEY": "e1eb1f30-5c4e-43aa-be04-4b50df00807a"
          }
        }
      )
      .then(response => {
        console.log(response);
        commit("setSingleCrypto", response.data.data);
        commit("setLoading", false);
      })
      .catch(function(err) {
        console.log(err);
        commit("setLoading", false);
      });
  },
  searchedCrypto({ commit }, payload) {
    console.log();

    commit("search", payload);
  },
  setMessages({ commit }, payload) {
    commit("setMessages", payload);
  }
};
const mutations = {
  setCryptos: (state, payload) => (state.cryptodata = payload),
  setSingleCrypto: (state, payload) => (state.singleCrypto = payload),
  search: (state, payload) => (state.search = payload),
  setLoading: (state, payload) => (state.loading = payload),
  logged: (state, payload) => (state.logged = payload),
  setMessages: (state, payload) => (state.chat = payload)
};

export default new Vuex.Store({
  state,

  actions,

  getters,

  mutations
});