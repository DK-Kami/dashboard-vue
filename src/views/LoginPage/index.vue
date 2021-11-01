<template>
  <div class="container login login_theme_dark">
    <el-row class="login__card">
      <el-col :span="8" class="login__selector">
        <div class="selector">
          <div
            :class="{ 'active__item' : isAuth }"
            class="selector__item"
            @click="isAuth = true"
          >Login <div class="triangle" /></div>

          <div
            :class="{ 'active__item' : isReg }"
            class="selector__item"
            @click="isAuth = false"
          >Register <div class="triangle" /></div>
        </div>
      </el-col>

      <el-row class="login-form">
        <el-col class="login__tip">forgot password?</el-col>
        <el-col class="form-container">
          <el-form
            v-if="isAuth"
            :model="authData"
            label-position="top"
            ref="authForm"
          >
            <el-form-item label="Login" prop="login" required>
              <el-input v-model="authData.login" />
            </el-form-item>

            <el-form-item label="Password" prop="password" required>
              <el-input v-model="authData.password" type="password" />
            </el-form-item>

            <el-form-item >
              <el-button>Login</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data: () => ({
    isAuth: true,

    authData: {
      login: '',
      password: '',
    },
  }),

  computed: {
    isReg(){
      return !this.isAuth;
    },
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