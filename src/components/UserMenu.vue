<template>

  <el-dropdown placement="bottom-start" hide-on-click :show-timeout="100">
    <div>
      <el-avatar shape="circle" size="large">
        <img src="@/assets/icons8-jake.svg" alt="Jake the Dog">
      </el-avatar>
      <span class="username">
        {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>Account</el-dropdown-item>
      <el-dropdown-item divided>Payment history</el-dropdown-item>
      <!-- may be payment history should be accessible through the Points item ? -->
      <el-dropdown-item divided>60909 points</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>

  
</template>

<script>
export default {
  name: "UserMenu",
  data() {
    return {

    }
  },
  computed: {
    username: function() {
      if (this.$store.state.user.loggedIn) {
        return this.$store.state.user.userInfo.username
      }
      else {
        return "Jonathan Doe"
      }
    }
  }
}
</script>

<style scoped>
.username {
  padding-left: 6px;
}
</style>
