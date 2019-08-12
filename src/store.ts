import Vue from 'vue'
import Vuex from 'vuex'
import { MarketplaceService } from "@/services/marketplace.ts";
import { CartItem, Cart } from "@/cart.ts";

Vue.use(Vuex);

const api = new MarketplaceService();

export default new Vuex.Store({
  state: {
    cart: new Cart(),
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
  getters: {
    getCartTotal: state => state.cart.getTotalCost(),
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
    ADD_TO_CART (state, item: CartItem) {
      state.cart.addItem(item);
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
    },
    addToCart ({ commit }, item: CartItem) {
      commit('ADD_TO_CART', item);
    }
  }
})
