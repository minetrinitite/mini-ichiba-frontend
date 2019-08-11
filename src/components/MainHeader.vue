<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-col :span="4">
          <span class="text-logo">ミニ市場</span>
        </el-col>
        <el-col :span="8">
          <el-menu :default-active="activeIndex" mode="horizontal" :router="true" @select="handleSelect">
            <el-menu-item index="/">Home</el-menu-item>
            <el-submenu index="/">
              <template slot="title">Categories</template>
              <el-menu-item v-for="category in item_categories" v-bind:key="category.id" index="/">
                {{ category.name }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="/about">About</el-menu-item>
            <el-menu-item index="/signin">Sign In</el-menu-item>
          </el-menu>
        </el-col>

        <!-- <el-col :span="10">
        </el-col> -->

        <el-col :span="6" :offset="6">
          <user-menu/>
        </el-col>
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
    ...mapState(['item_categories'])
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
  font-size: 2.5em;
  padding: 5px;
  margin: 5px;
}
</style>