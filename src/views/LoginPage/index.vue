<template>
  <div class="container login login_theme_dark">
    <el-row class="login__card">
      <el-col :span="8" class="login__selector">
        <div class="selector">
          <div
            :class="{ 'active__item' : isAuth }"
            class="selector__item"
            @click="changeForm('auth')"
          >Login <div class="triangle" /></div>

          <div
            :class="{ 'active__item' : isReg }"
            class="selector__item"
            @click="changeForm('register')"
          >Register <div class="triangle" /></div>
        </div>
      </el-col>

      <el-row class="login-form">
        <el-col class="login__tip">forgot password?</el-col>
        <el-col class="form-container">
          <el-form
            v-if="isAuth"
            :model="authData"
            :rules="rules"
            label-position="top"
            ref="authForm"
            @submit.prevent="handleSubmit"
          >
            <el-form-item label="Login" prop="login" required>
              <el-input v-model="authData.login" />
            </el-form-item>

            <el-form-item label="Password" prop="password" required>
              <el-input v-model="authData.password" type="password" />
            </el-form-item>

            <el-form-item>
              <el-button @click.prevent="handleSubmit">Login</el-button>
            </el-form-item>
          </el-form>

          <el-form
            v-else
            :model="regData"
            :rules="rules"
            label-position="top"
            ref="regForm"
          >
            <el-form-item label="Login" prop="login" required>
              <el-input v-model="regData.login" />
            </el-form-item>

            <el-form-item label="Password" prop="password" required>
              <el-input v-model="regData.password" type="password" />
            </el-form-item>

            <el-form-item label="Repeat password" prop="repeatPassword" required>
              <el-input v-model="regData.repeatPassword" type="password" />
            </el-form-item>

            <el-form-item >
              <el-button>Register</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col v-if="errorMessage">
          {{ errorMessage }}
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  created() {
    const { path } = this.$route;

    if (path === '/login') this.isAuth = true;
    else if (path === '/register') this.isAuth = false;
    else this.router.replace({ name: 'LoginPage' });
  },

  data() {
    const authData = {
      login: '',
      password: '',
    };
    const passwordRule = (_, value, callback) => {
      if (this.isAuth) return callback();
      if (this.regData.repeatPassword) {
        return this.$refs.regForm.validateField('repeatPassword');
      }
      return callback();
    }
    const repeatPasswordRule = (_, value, callback) => {
      if (this.isAuth) return callback();
      if (value !== this.regData.password) return callback(new Error('Two passwords don\'t match'));
      return callback();
    }

    const rules = {
      ...this.$store.getters['rules/getRules'],
      password: [{ validator: passwordRule, trigger: 'blur' }],
      repeatPassword: [{ validator: repeatPasswordRule, trigger: 'blur' }],
    }
    
    return {
      errorMessage: '',
      isAuth: true,

      authData,

      regData: {
        ...authData,
        repeatPassword: '',
      },
      
      rules,
    }
  },

  computed: {
    isReg(){
      return !this.isAuth;
    },
  },

  methods: {
    changeForm(formType) {
      if (formType === 'auth' && !this.isAuth) {
        this.isAuth = true;
        this.$router.push({ name: 'LoginPage' });
      }
      if (formType === 'register' && this.isAuth) {
        this.isAuth = false;
        this.$router.push({ name: 'RegisterPage' });
      }
    },

    async handleSubmit() {
      const { error, errorMessage } = await this.$store.dispatch('auth/login', {
        password: this.authData.password,
        login: this.authData.login,
      });

      if (error) {
        this.errorMessage = errorMessage;
      }
      else this.errorMessage = '';
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary-color;
}
.login__card {
  background-color: #fff;
  height: 600px;
  width: 850px;
  overflow: hidden;
  -webkit-box-shadow: 0px 0px 30px -3px rgba(0,0,0,0.96) !important;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.2) !important;
}
.login_theme_dark {
  background: rgb(255,255,255);
  background: linear-gradient(145deg, white 0%, white 50%, $secondary-color 50.1%, $secondary-color 100%);
}

.login__selector {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $primary-color;

  .selector {
    text-align: left;

    .selector__item {
      display: flex;
      justify-content: space-between;
      font-size: 40px;
      padding: 20px 0;
      width: 150px;
      height: 50px;
      cursor: pointer;
      color: #ffffff77;
    }
  }

  .active__item {
    color: #fff !important;

    .triangle {
      width: 0px;
    }

    .triangle::before {
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 30px 52.0px 30px 0;
      border-color: transparent white transparent transparent;
      display: inline-block;
      position: relative;
      left: 15px;
      top: -5px;
    }
  }
}

.login-form {
  display: flex;
  flex: 1;
  justify-content: center;
  // align-self: flex-start;
  align-self: stretch;

  .login__tip {
    text-align: end;
    font-size: 12px;
    padding: 5px;
    color: #00000077;
    cursor: pointer;
    transition: .4s;
  }
  .login__tip:hover {
    color: #000000aa;
  }

  .form-container {
    max-width: 350px;
  }
}
</style>