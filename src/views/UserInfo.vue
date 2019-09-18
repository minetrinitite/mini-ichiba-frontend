<template>
	<div class="container">
        <h1>{{getUser.userInfo.username}}</h1>
        <p>You have {{getUserPoints}} points.</p>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapState } from 'vuex';

export default Vue.extend({
    name: "UserInfo",
    computed: {
        ...mapGetters(['isLoggedIn', 'getUser', 'getUserPoints'])
    },
    methods: {
    },
    mounted () {
        if (this.isLoggedIn == false)
            this.$router.replace("/signin");
        else this.$store.dispatch("fetchPoints");
    }
})
</script>

<style scoped>
</style>