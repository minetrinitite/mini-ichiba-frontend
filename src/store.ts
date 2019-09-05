import Vue from 'vue'
import Vuex from 'vuex'
import { MarketplaceService } from "@/services/marketplace.ts";
import { LoginService } from "@/services/loginService";
import { PointsService } from "@/services/pointsService";

Vue.use(Vuex);

const marketplaceApi = new MarketplaceService();
const loginApi = new LoginService();
const pointsApi = new PointsService();

export default new Vuex.Store({
  state: {
    user: {
      userInfo: {
        username: "",
      },
      loggedIn: false,
      accessToken: null,
      refreshToken: null,
      points: {
      },
      transactions: []
    },
    items: [
      {
        name: "item1",
        price: 455,
        averageRating: 4.4,
        points: null,
      },
      {
        name: "item2",
        price: 75000,
        averageRating: 3.7,
        points: null,
      },
      {
        name: "item4 SPECIAL OFFER JUST NOW",
        price: 999,
        averageRating: 4.8,
        points: null,
      },
      {
        name: "item3",
        price: 7000,
        averageRating: 4.0,
        points: null,
      },
    ],
    loading_items: false,
    item_categories: [
      {
        name: "Electronics",
        id: 55,
      },
      {
        name: "Forks",
        id: 66,
      },
      {
        name: "Spoons",
        id: 77,
      },
    ]
  },
  mutations: {
    SET_ITEMS (state, items) {
      state.items = items
    },
    SET_LOADING_ITEMS (state, value) {
      state.loading_items = value
    },
    SET_ITEM_CATEGORIES (state, item_categories) {
      state.item_categories = item_categories;
    },
    SET_CREDENTIALS (state, tokens) {
      state.user.accessToken = tokens.accessToken ? tokens.accessToken : null;
      state.user.refreshToken = tokens.refreshToken ? tokens.refreshToken : null
      if (state.user.refreshToken && state.user.accessToken) {
        state.user.loggedIn = true;
      }
    }
  },
  actions: {
    async loadItems ({ commit }) {
      commit('SET_LOADING_ITEMS', true);
      const items = await marketplaceApi.getAllProducts();
      if (items) {
        commit("SET_ITEMS", items);
      }
      commit('SET_LOADING_ITEMS', false);
    },

    async loadItemCategories ({ commit }) {
      commit('SET_LOADING_ITEMS', true);
      const categories = await marketplaceApi.getAllCategories();
      if (categories) {
        commit("SET_ITEM_CATEGORIES", categories);
      }
      commit('SET_LOADING_ITEMS', false);
    },

    async login({ commit }, params) {
      commit('SET_LOADING_ITEMS', true);
      const data = await loginApi.login(params.username, params.password);
      if (data) {
        const tokens = {
          accessToken: data["access token"],
          refreshToken: data["refresh token"]
        }
        commit("SET_CREDENTIALS", tokens);
        commit('SET_LOADING_ITEMS', false);
        return tokens
      }
      commit('SET_LOADING_ITEMS', false);
      return 0
    },

    async payWithPoints({ commit }, params) {
      commit('SET_LOADING_ITEMS', true);
      const currentUser = "";
      const pointsTransaction = await pointsApi.startPointsTransaction(currentUser, - params.checkoutTotal);
      const data = await pointsApi.endPointsTransaction(pointsTransaction.transactionId);
      commit('SET_LOADING_ITEMS', false);
      return 0
    }
  }
})
