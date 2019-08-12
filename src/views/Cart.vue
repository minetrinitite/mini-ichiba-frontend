<template>
    <el-main>
        <div class="cart-container" v-if="cart.getItemCount() > 0">
            <h1>Your cart:</h1>
            <el-table :data="cart.items">
                <el-table-column prop="name" label="Name"/>
                <el-table-column prop="price" label="Price"/>
                <el-table-column prop="amount" label="Amount"/>
            </el-table>
            <div class="total-price">Total: ¥{{ getCartTotal }}</div>
            <el-button type="primary">Checkout</el-button>
        </div>
        <div class="cart-container" v-else>
            <h1>Your cart is empty</h1>
            <p>Consider buying something at our shop.</p>
            <el-button type="primary" @click="goHome">Start shopping</el-button>
        </div>
    </el-main>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';

export default Vue.extend({
  name: "Cart",
  computed: {
      ...mapGetters(['getCartTotal']),
      ...mapState(['cart'])
  },
  methods: {
      goHome () {
          this.$router.push("/");
      }
  }
})
</script>
<style scoped>
.total-price {
    font-size: 30px;
    line-height: 35px;
    text-align: right;
    margin: 10px;
}
</style>