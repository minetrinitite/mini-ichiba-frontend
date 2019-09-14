<template>
    <el-container>
        <el-main v-loading="awaiting">
            <div class="container">
                <h1>Payment transaction failed</h1>
                <p>We're sorry for the inconvenience.</p>
                <el-button type="primary" @click="goHome">Start shopping</el-button>
            </div>
        </el-main>
  </el-container>
</template>
<script>
export default {
    methods: {
        methods: {
            goHome () {
                this.$router.push("/");
            }
        }
    }
}
</script>
<style scoped>
.el-main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}

p {
    text-align: left;
}

.container {
    width: 500px;
}
</style>