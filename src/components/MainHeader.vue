<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="16">

        <el-col :span="8">
          <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">Home</el-menu-item>
            <el-submenu index="2">
              <template slot="title">Categories</template>
              <el-menu-item index="2-1">Category 1</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">About</el-menu-item>
          </el-menu>
        </el-col>

        <!-- <el-col :span="10">
        </el-col> -->

        <el-col :span="6" :offset="10">
          <user-menu/>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

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
  methods: {
    handleSelect(key: string, keyPath: string) {
      console.log(key, keyPath);
    }
  }
})
</script>
