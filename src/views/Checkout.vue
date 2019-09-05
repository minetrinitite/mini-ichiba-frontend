<template>
    <el-container>
        <el-main v-loading="awaiting">
            <div class="container">
                <h1>Checkout</h1>
                <div class="total-price">Total: ¥{{ getCartTotal }}</div>
                <div class="granted-points">You will receive {{ getCartPoints }} pts after this purchase.</div>
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
                        <el-button type="primary" @click="submit">Continue</el-button>
                    </el-form-item>
                </el-form>
            </div>
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
            // TODO: link with Membership service
            var request = {
                customerName: this.form.customerName,
                customerAddress: this.form.customerAddress,
                customerId: "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
                entries: this.getCartItems
            }

            this.awaiting = true;
            var result = this.$store.dispatch("sendOrder", request);
            result.then(value => {
                console.log(value);
                if (value == 200) {
                    this.$store.dispatch("clearCart");
                    this.$message({
                        message: 'Successfully sent the order! Redirecting back to the shop...',
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$router.push("/");
                    }, 2500);
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