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
    loading_orders: false,
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
    ],
    orders: []
  },
  getters: {
    getCartItems: state => state.cart.getItems(),
    getCartTotal: state => state.cart.getTotalCost(),
    getCartPoints: state => state.cart.getGrantedPoints()
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
    },
    REMOVE_FROM_CART (state, item: CartItem) {
      state.cart.removeItem(item);
    },
    CLEAR_CART (state) {
      state.cart.clear();
    },
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    SET_LOADING_ORDERS(state, value) {
      state.loading_orders = value;
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
    },

    removeFromCart ({ commit }, item: CartItem) {
      commit('REMOVE_FROM_CART', item);
    },
    
    async sendOrder (state, order: object) {
      const result = await api.postOrder(order);
      if (result)
        return result;
    },

    clearCart ({ commit}) {
      commit('CLEAR_CART');
    },

    async loadOrders ({ commit }, id) {
      commit('SET_LOADING_ORDERS', true);
      const orders = await api.getAllOrders(id);
      if (orders) {
        commit("SET_ORDERS", orders);
      }
      commit("SET_LOADING_ORDERS", false);
    }
  }
})
