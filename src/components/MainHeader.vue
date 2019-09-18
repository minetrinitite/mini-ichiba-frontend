<template>
  <div>
    <el-row type="flex">
      <el-col :xs="4" :sm="4" class="text-logo">
        <span >ミニ市場</span>
      </el-col>
      <el-col :xs="20" :sm="20">  
        <el-menu :default-active="activeIndex" :router="true" mode="horizontal" class="menu-flex" @select="handleSelect">
          <el-menu-item index="/">Home</el-menu-item>
          <!-- Not yet implemented properly -->
          <!--<el-submenu index="/">
            <template slot="title">Categories</template>
            <el-menu-item v-for="category in item_categories" :key="category.id" :index="'2-' + category.id">
              {{ category.name }}
            </el-menu-item>
          </el-submenu>-->
          <el-menu-item index="/cart">Cart <el-badge v-if="cartItems !== 0" class="cart-amount-block" :value="cartItems" /></el-menu-item>
          <el-menu-item index="/about">About</el-menu-item>
          <el-menu-item>
            <user-menu/>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

import UserMenu from "@/components/UserMenu.vue";

export default Vue.extend({
  name: "MainHeader",
  components: {
    UserMenu
  },
  data() {
    return {
      activeIndex: "1",
    }
  },
  computed: {
    ...mapState(['item_categories']),

    cartItems: function() {
      return this.$store.state.cart.getItemCount();
    }
  },
  methods: {
    handleSelect(key: string, keyPath: string) {
      console.log(key, keyPath);
    }
  },
  mounted () {
    this.$store.dispatch('loadItemCategories');
  },
})
</script>

<style scoped>
.text-logo {
  background-color: #c80000;
  color: white;
  font-weight: 600;
  font-size: 2.5em;
  padding: 4px;
  min-width: 170px;
  max-height: 60px;
  display: flex;
  justify-content: center; 
}

.not-allowed-icon-off:hover {
  cursor: default;
}

.menu-flex {
  display: flex;
  font-weight: 600;
}

.cart-amount-block {
  margin: 0 0 4px 0;
}

li:last-child {
  margin-left: auto;
}
</style>