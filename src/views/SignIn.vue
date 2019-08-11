<template>
    <el-container>
        <!--<el-aside width="200px">Aside</el-aside>-->
        <el-main>
            <el-card class="box">
                <el-form ref="form" :model="form" :rules="rules" label-position="left">
                    <h1>Sign In</h1>
                    <el-form-item label="Username" prop="username">
                        <el-input v-model="form.username" placeholder="Username"/>
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input type="password" v-model="form.password" placeholder="Password" autocomplete="false"/>
                    </el-form-item>
                    <el-form-item>
                        <div class="login-link"><el-link href="/password-recovery" type="primary">Forgot your password?</el-link></div>
                        <div class="login-link"><el-link href="/signup" type="primary"> Sign Up</el-link></div>
                    </el-form-item>
                    <el-form-item>    
                        <el-button type="primary" @click="onSubmit('form')" class="login-button">Sign In</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </el-container>
</template>
<script>
export default {
    data() {
        // TODO: extra checks
        var checkUsername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("Please input the username."));
            } else {
                callback();
            }
        };

        var checkPassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("Please input the password."));
            } else {
                callback();
            }
        };

        return {
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [{ validator: checkUsername, trigger: 'blur'}],
                password: [{ validator: checkPassword, trigger: 'blur'}]
            }
        };
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // TODO: submit auth request to the Membership service
                    alert('submitted');
                } else {
                    console.log("failed to submit.");
                    return false;
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

.box {
    width: 300px;
    box-sizing: border-box;
}

.login-link {
    line-height: 25px;
    text-align: left;
}

.login-button {
    width: 100%;
}

h1 {
    margin-bottom: 25px;
    font-size: 25px;
    line-height: 30px;
}
</style>