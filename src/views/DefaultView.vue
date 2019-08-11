<template>
  <el-row type="flex">
    <el-col :sm="2" class="hidden-sm-and-down">
    </el-col>
    <el-col :xs="24" :sm="24" :md="18">
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
