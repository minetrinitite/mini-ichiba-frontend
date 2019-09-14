<template>
    <el-container>
        <el-main v-loading="awaiting">
            <el-card class="box">
                <h1>Checkout</h1>
                <div class="total-price">Total: ¥{{ getCartTotal }}</div>
                <div class="granted-points">You will receive {{ getCartPoints }} MiniIchiba points after this purchase.</div>
                <el-form ref="form" :model="form">
                    <el-form-item label="Your name">
                        <el-input v-model="form.customerName" placeholder="Name"/>
                    </el-form-item>
                    <el-form-item label="Your address">
                        <el-input v-model="form.customerAddress" placeholder="Address"/>
                    </el-form-item>
                    <el-form-item v-if="getUserPoints > 0">
                        <p>You have <span class="points">{{ getUserPoints }}</span> MiniIchiba points.</p>
                        <p>Please input how many of them you would like to spend:</p>
                        <el-input v-model="form.usedPoints" placeholder="Points"/>
                    </el-form-item>
                    <el-form-item v-else>
                        <p>You have no MiniIchiba points.</p>
                        <p v-if="getCartPoints > 0">However, you will receive them after this purchase, so that any future purchase is cheaper.</p>
                    </el-form-item>
                    <el-form-item>
                        <h2>Payment method</h2>
                        <el-radio v-model="paymentMethod" :label="paypal">PayPal</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">Continue</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
  </el-container>
</template>
<script>
import { mapGetters, mapState } from 'vuex';

export default {
    data() {
        return {
            form: {
                customerName: "",
                customerAddress: "",
                usedPoints: 0
            },
            paymentMethod: "paypal",
            awaiting: false
        }
    },
    computed: {
        ...mapGetters(['getCartTotal', 'getCartPoints', 'getCartItems']),
        ...mapState(['cart']),
        getUserPoints () {
            // TODO: add getter to vuex store && link it to Points service
            return 42;
        }
    },
    methods: {
        submit () {
            // First we post an Order to our backend service
            // TODO: link with Membership service
            var orderRequest = {
                customerName: this.form.customerName,
                customerAddress: this.form.customerAddress,
                customerId: "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
                usedPoints: this.form.usedPoints,
                entries: this.getCartItems
            }

            this.awaiting = true;
            var result = this.$store.dispatch("sendOrder", orderRequest);
            result.then(response => {
                console.log(response.status);
                console.log(response.data);
                console.log(response);

                // If everything is OK, the backend service should've provided a URI to redirect to
                if (response.status == 200) {
                    // The payment service will not respond with redirection URI if entire purchase was done with points
                    if (response.data.redirectURI)
                        this.$router.replace(response.data.redirectURI);
                    else
                        this.$router.replace("/");
                } else {
                    this.$message.error('Failed to send order.');
                    this.awaiting = false;
                }
            });
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