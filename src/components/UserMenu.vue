<template>

  <el-dropdown v-if="isLoggedIn" placement="bottom-start" hide-on-click :show-timeout="100">
    <div>
      <el-avatar shape="circle" size="large">
        <img src="@/assets/icons8-jake.svg" alt="Jake the Dog">
      </el-avatar>
      <span class="username">
        {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item><router-link to="/user">Account</router-link></el-dropdown-item>
      <el-dropdown-item divided><router-link to="/orders">Purchase history</router-link></el-dropdown-item>
      <!-- may be payment history should be accessible through the Points item ? -->
      <!--<el-dropdown-item divided>60909 points</el-dropdown-item>-->
      <el-dropdown-item divided><div @click="signOut">Sign Out</div></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <router-link v-else to="/signin">Sign In</router-link>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: "UserMenu",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    username: function() {
      if (this.$store.state.user.loggedIn) {
        return this.$store.state.user.userInfo.username
      }
      else {
        return "Jonathan Doe"
      }
    }
  },
  methods: {
    signOut () {
      this.$message.success("Signed out!");
      this.$store.dispatch('signOut');
      this.$router.replace("/");
    }
  }
}
</script>

<style scoped>
a {
  text-decoration-line: none !important;
}
.username {
  padding-left: 6px;
}
</style>
