<template>
    <el-container>
        <el-main v-loading="loading_orders">
            <div class="orders-container" v-if="orders.length > 0">
                <h1>Your orders:</h1>
                <el-card class="orders-row" v-for="order in orders" :key="order.id">
                    <el-row :gutter="10">
                        <el-col :xs="8" :sm="8">
                            {{ order.id }}
                        </el-col>
                        <el-col :xs="8" :sm="8">
                            {{ order.creationDate }}
                        </el-col>
                        <el-col :xs="4" :sm="4">
                            {{ order.status }}
                        </el-col>
                    </el-row>
                </el-card>
            </div>
            <div class="orders-container" v-else>
                <h1>There are no orders</h1>
                <p>Consider buying something at our shop.</p>
                <el-button type="primary" @click="goHome">Start shopping</el-button>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import { mapState } from "vuex";
import Vue from "vue";

export default Vue.extend({
    name: "Orders",
    computed: {
      ...mapState(['orders', 'loading_orders'])
    },
    methods: {
        goHome () {
            this.$router.push("/");
        }
    },
    mounted () {
        // TODO: swap for real user ID
        if (this.$store.state.user.loggedIn == false) {
            console.log("not logged in");
            this.$router.replace("/signin");
        } else {
            this.$store.dispatch('loadOrders', this.$store.state.user.accessToken);
        }
    }
})
</script>
<style scoped>
.el-main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.orders-container {
    width: 1000px;
}

.orders-row {
    margin-bottom: 10px;
}
</style>