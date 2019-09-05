<template>
    <el-main>
        <div class="cart-container" v-if="cart.getItemCount() > 0">
            <h1>Your cart:</h1>
            <el-card class="cart-row" v-for="item in cart.items" :key="item.id">
                <el-row :gutter="10">
                    <router-link to="/">
                    <el-col :xs="4" :sm="4">
                        <div class="image-block">
                            <el-image fit="cover" class="image-slot">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="8">
                        {{ item.name }}
                    </el-col>
                    </router-link>

                    <el-col :xs="4" :sm="4">
                        <div>¥{{ item.price }} x <el-input-number v-model="item.amount" :min="1" :max="25" controls-position="left" size="mini"></el-input-number></div>
                    </el-col>
                    <el-col :xs="2" :sm="2">
                        <div>¥{{ item.price * item.amount }}</div>
                        <div class="item-points">{{ item.points * item.amount }} pts</div>
                    </el-col>
                    <el-col :xs="4" :sm="4">
                        <el-button type="danger" @click="removeFromCart(item)">Delete</el-button>
                    </el-col>
                </el-row>
                
            </el-card>
            <div class="total-price">Total: ¥{{ getCartTotal }}</div>
            <el-button type="primary" @click="goCheckout">Checkout</el-button>
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
      },
      goCheckout () {
          this.$router.push("/checkout");
      },
      removeFromCart (item: any) {
          this.$store.dispatch("removeFromCart", item);
      }
  }
})
</script>
<style scoped>
a {
  text-decoration-line: none !important;
}

.cart-row {
    margin-bottom: 10px;
}

.total-price {
    font-size: 30px;
    line-height: 35px;
    text-align: right;
    margin: 10px;
}

.item-points {
  display: inline-block;
  text-align: right;
  font-size: 12px;
  font-weight: 600;
  color:  #888888;
  width: 45%;
}
</style>