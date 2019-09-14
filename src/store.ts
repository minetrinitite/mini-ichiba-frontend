import Vue from 'vue'
import Vuex from 'vuex'
import { MarketplaceService } from "@/services/marketplace.ts";
import { CartItem, Cart } from "@/cart.ts";
import { LoginService } from "@/services/loginService";
import { PointsService } from "@/services/pointsService";

Vue.use(Vuex);

const marketplaceApi = new MarketplaceService();
const loginApi = new LoginService();
const pointsApi = new PointsService();

export default new Vuex.Store({
  state: {
    cart: new Cart(),
    user: {
      userInfo: {
        username: "",
        userId: ""
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
        id: 1,
        name: "item1",
        price: 455,
        averageRating: 4.4,
        points: null,
      },
      {
        id: 2,
        name: "item2",
        price: 75000,
        averageRating: 3.7,
        points: null,
      },
      {
        id: 3,
        name: "item4 SPECIAL OFFER JUST NOW",
        price: 999,
        averageRating: 4.8,
        points: null,
      },
      {
        id: 4,
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

    addToCart ({ commit }, item: CartItem) {
      commit('ADD_TO_CART', item);
    },

    removeFromCart ({ commit }, item: CartItem) {
      commit('REMOVE_FROM_CART', item);
    },
    
    async sendOrder (state, order: object) {
      const result = await marketplaceApi.postOrder(order);
      if (result)
        return result;
    },

    clearCart ({ commit}) {
      commit('CLEAR_CART');
    },

    async loadOrders ({ commit }, id) {
      commit('SET_LOADING_ORDERS', true);
      const orders = await marketplaceApi.getAllOrders(id);
      if (orders) {
        commit("SET_ORDERS", orders);
      }
      commit("SET_LOADING_ORDERS", false);
    },

    async login({ commit }, params) {
      commit('SET_LOADING_ITEMS', true);
      const data = await loginApi.login(params.email, params.password);
      if (data) {
        const tokens = {
          accessToken: data["access_token"],
          refreshToken: data["refresh_token"]
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
