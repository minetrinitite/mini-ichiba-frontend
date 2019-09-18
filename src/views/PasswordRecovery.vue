<template>
    <el-container>
        <el-main v-loading="awaiting">
            <el-card class="box">
                <h1>Password Recovery</h1>
                <el-form ref="form" :model="form" :rules="rules" label-position="left">
                    <el-form-item label="New Password" prop="password">
                        <el-input type="password" v-model="form.password" placeholder="Password" autocomplete="false"/>
                    </el-form-item>
                    <el-form-item>    
                        <el-button type="primary" @click="submitForm('form')" class="login-button">Recover Password</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>

import { LoginService } from "@/services/loginService";

export default Vue.extend({
  data() {
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
              password: ""
          },
          awaiting: false,
          rules: {
              password: [{ validator: checkPassword, trigger: 'blur' }]
          }
      };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
            return false;
        } else {
            console.log("failed to submit.");
            return false;
        }
      });
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