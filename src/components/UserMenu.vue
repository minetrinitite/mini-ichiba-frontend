<template>
  <div>
    <el-avatar shape="circle" size="large">
      <img src="@/assets/icons8-jake.svg" alt="Jake the Dog">
    </el-avatar>
    <span class="username">Jonathan Doe</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "UserMenu",
  data() {
    return {

    }
  }
})
</script>

<style scoped>
.username {
  padding-left: 6px;
}
</style>
