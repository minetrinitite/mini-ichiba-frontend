<template>
  <el-row>
    <el-col :xs="20">
      <div id="main">
        <el-container>
          <el-header>
            <main-header/>
          </el-header>
          <router-view></router-view>
          <el-footer>
            <main-footer/>
          </el-footer>
        </el-container>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import Vue from "vue";

import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";

export default Vue.extend({
  name: "DefaultView",
  components: {
    MainHeader,
    MainFooter
  },
  data() {
    return {
    }
  },

})
</script>
