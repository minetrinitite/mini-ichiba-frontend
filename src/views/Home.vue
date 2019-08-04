<template>
  <el-container>
    <el-header>
      <main-header/>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <div class="home">
          <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
        </div>
      </el-main>
    </el-container>
    <el-footer>
      <main-footer/>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
import HelloWorld from '@/components/HelloWorld.vue';

export default Vue.extend({
  name: "Home",
  components: {
    HelloWorld,
    MainHeader,
    MainFooter
  }
})
</script>
