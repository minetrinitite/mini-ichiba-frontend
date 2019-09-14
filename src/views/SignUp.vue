<template>
    <el-container>
        <el-main v-loading="awaiting">
            <el-card class="box">
                <h1>Sign Up</h1>
                <el-form ref="form" :model="form" :rules="rules" label-position="left">
                    <el-form-item label="Username" prop="name">
                        <el-input v-model="form.name" placeholder="Username"/>
                    </el-form-item>
                    <el-form-item label="Email" prop="email">
                        <el-input v-model="form.email" placeholder="Email"/>
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input type="password" v-model="form.password" placeholder="Password" autocomplete="false"/>
                    </el-form-item>
                    <el-form-item>    
                        <el-button type="primary" @click="submitForm('form')" class="login-button">Sign Up</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>

import { LoginService } from "@/services/loginService";

export default {
  data() {
      // TODO: extra checks
      var checkName = (rule, value, callback) => {
          if (value === "") {
              callback(new Error("Please input the username."));
          } else {
              callback();
          }
      };

      var checkEmail = (rule, value, callback) => {
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
          loginApi: new LoginService(),
          form: {
              name: "",
              email: "",
              password: ""
          },
          awaiting: false,
          rules: {
              name: [{ validator: checkName, trigger: 'blur' }],
              email: [{ validator: checkEmail, trigger: 'blur' }],
              password: [{ validator: checkPassword, trigger: 'blur' }]
          }
      };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
            this.awaiting = true;
            const data = await this.loginApi.createNewUser(this.form.name, this.form.email, this.form.password);
            if (data) {
                console.log(data);
                this.$message.success('Successfully registered!');
                this.awaiting = false;
                setTimeout(function () { this.$router.replace("/signin"); }, 1500);
                return true;
            }
            return false;
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