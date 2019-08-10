import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { MarketplaceService } from "@/services/marketplace.ts";

Vue.use(Vuex);

const api = new MarketplaceService();

export default new Vuex.Store({
  state: {
    items: [
      {
        name: "item1",
        price: 455,
      },
      {
        name: "item2",
        price: 75000,
      },
      {
        name: "item4 SPECIAL OFFER JUST NOW",
        price: 999,
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
    }
  },
  actions: {
    async loadItems ({ commit }) {
      commit('SET_LOADING_ITEMS', true);
      const items = await api.getAllProducts();
      if (items) {
        commit("SET_ITEMS", items);
      }
      commit('SET_LOADING_ITEMS', false);
    },
    async loadItemCategories ({ commit }) {
      commit('SET_LOADING_ITEMS', true);
      const categories = await api.getAllCategories();
      if (categories) {
        commit("SET_ITEM_CATEGORIES", categories);
      }
      commit('SET_LOADING_ITEMS', false);
    }
  }
})
