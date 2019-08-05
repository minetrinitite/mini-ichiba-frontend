<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>
      <div class="home">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";

import HelloWorld from '@/components/HelloWorld.vue';

export default Vue.extend({
  name: "Home",
  components: {
    HelloWorld,
  }
})
</script>
