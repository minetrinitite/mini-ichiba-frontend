<template>
  <el-row>
    <el-col :xs="20">
      <div id="main">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DefaultView",
  components: {
  },
  data() {
    return {
    }
  },

})
</script>
