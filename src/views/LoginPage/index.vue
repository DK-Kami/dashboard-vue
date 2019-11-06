<template>
  <v-container fill-height>
    <v-layout justify-center align-center fill-height>
      <v-flex xs4>
        <v-card>
          <v-slide-y-transition>
            <v-alert
              v-if="error"
              color="error"
              type="error"
              border="top"
              icon="error"
              class="mb-0"
              text
            >{{ error }}</v-alert>
          </v-slide-y-transition>

          <v-slide-y-transition>
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
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthForm from './AuthForm';
import RegistrationForm from './RegistrationForm';

export default {
  name: 'LoginPage',
  components: { AuthForm, RegistrationForm },
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
    changeForm() {
      if (this.isAuth) {
        this.auth.password = '';
        this.auth.login = '';
      }
      else {
        this.register.password = '';
        this.register.nickname = '';
        this.register.email = '';
      }
      this.isAuth = !this.isAuth;
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
