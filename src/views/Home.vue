<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>
      <div class="home">
        <Items/>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";
import Items from '@/components/Items.vue';

export default Vue.extend({
  name: "Home",
  components: {
    Items,
  }
})
</script>
