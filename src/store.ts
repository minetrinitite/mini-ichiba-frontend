import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    loading_items: false,
    item_categories: []
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
    loadItems ({ commit }) {
      commit('SET_LOADING_ITEMS', true)
      axios
        .get('http://localhost:8089/products/all')
        .then(r => r.data)
        .then(items => {
          commit('SET_ITEMS', items)
          commit('SET_LOADING_ITEMS', false)
        })
    },
    loadItemCategories ({ commit }) {
      axios
        .get('http://localhost:8089/categories/all')
        .then(r => r.data)
        .then(categories => {
          commit('SET_ITEM_CATEGORIES', categories)
        })
    }
  }
})
