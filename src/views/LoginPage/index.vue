<template>
  <v-container fill-height fluid class="login__background">
    <v-layout justify-center align-center fill-height>
      <v-card class="form__card">
        <v-layout fill-height>
          <v-flex class="login__items" xs5>
            <v-layout class="pl-8" align-center fill-height>
              <v-flex xs12>
                <v-row shrink :class="[isAuth ? 'active__item' : '']" @click="changeForm('auth')">
                  <v-col cols="9" class="login__item">Login</v-col>
                  <v-slide-x-reverse-transition><v-col v-if="isAuth" class="triangle" /></v-slide-x-reverse-transition>
                </v-row>
                <v-row shrink :class="[!isAuth ? 'active__item' : '']"  @click="changeForm('register')">
                  <v-col cols="9" class="login__item">Register</v-col>
                  <v-slide-x-reverse-transition><v-col v-if="!isAuth" class="triangle" /></v-slide-x-reverse-transition>
                </v-row>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex class="login__form">
            <v-layout column fill-height>
              <v-flex shrink class="login__tip pt-2 pr-4" @click="openForgotPassword">
                forgot password?
              </v-flex>

              <v-layout justify-center align-center>
                <auth-form
                  v-if="isAuth" 
                  :data.sync="auth"
                  :rules="rules"
                  @change-form="changeForm"
                  @submit="login"
                />
                <registration-form
                  v-else
                  :data.sync="register"
                  :rules="rules"
                  @change-form="changeForm"
                  @submit="registation"
                />
              </v-layout>

              <v-flex shrink class="login__error">
                <v-slide-y-reverse-transition>
                  <v-alert
                    v-if="error"
                    color="error"
                    type="error"
                    border="top"
                    icon="error"
                    class="mb-0"
                    text
                  >{{ error }}</v-alert>
                </v-slide-y-reverse-transition>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import AuthForm from './AuthForm';
import RegistrationForm from './RegistrationForm';

export default {
  name: 'LoginPage',

  components: { AuthForm, RegistrationForm },

  created() {
    this.isAuth = this.$route.name == 'login';
  },

  data: vm => ({
    auth: {
      password: '',
      login: '',
    },
    register: {
      password: '',
      nickname: '',
      email: '',
    },

    isAuth: true,
    valid: true,
    error: '',

    rules: vm.$store.getters.getRules,
  }),

  methods: {
    changeForm(type) {
      if (type === 'register' && this.isAuth) {
        this.auth.password = '';
        this.auth.login = '';
        this.$router.push('/registration');
        this.isAuth = false;
      }
      else if (type === 'auth' && !this.isAuth) {
        this.register.password = '';
        this.register.nickname = '';
        this.register.email = '';
        this.$router.push('/login');
        this.isAuth = true;
      }
    },

    //TODO: Дописать открытие страницы восстановления страницы
    openForgotPassword() {
      console.log('openForgotPassword');
    },

    async login() {
      const { error, data } = await this.$store.dispatch('auth/login', this.auth);
      this.handleAuth({ error, data });
    },
    async registation() {
      const { error, data } = await this.$store.dispatch('auth/registration', this.register);
      this.handleAuth({ error, data });
    },

    handleAuth({ error, data }) {
      if (error) {
        this.error = data;
      }
      else {
        this.error = '';
        this.$router.replace({ name: 'dashboard' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../plugins/variables/theme.scss";

  .form__card {
    height: 600px;
    width: 845px;

    overflow: hidden;

    -webkit-box-shadow: 0px 0px 30px -3px rgba(0,0,0,0.96) !important;
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.2) !important;
  }

  .login__items  {
    background-color: $primary-color;
    color: #ffffffab;
  }
  .login__item {
    font-size: 3em;
    cursor: pointer;
    user-select: none;
    text-align: right;
  }
  .active__item>.login__item {
    color: white;
  }
  .active__item>.triangle::before {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 30px 52.0px 30px 0;
    border-color: transparent white transparent transparent;
    display: inline-block;
    position: relative;
    left: 10px;
    top: 5px;
  }

  .login__tip {
    color: grey;
    font-size: 12px;
    text-align: right;
    cursor: pointer;
    text-decoration: underline;
  }
  .login__error {
    min-height: 58px;
  }

  .login__background {
    background: rgb(255,255,255);
    background: linear-gradient(135deg, white 0%, white 50%, $secondary-color 50.1%, $secondary-color 100%);
  }
</style>
