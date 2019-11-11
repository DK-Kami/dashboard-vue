<template>
  <v-app>
    <login-page v-if="isLogin" />

    <default-layout v-else />
  </v-app>
</template>

<script>
import LoginPage from './views/LoginPage';
import DefaultLayout from './Layout';
import axios from 'axios';
export default {
  name: 'App',
  components: {
    DefaultLayout,
    LoginPage,
  },
  created() {
    axios.get('http://localhost:5000/api/github/login/');
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login' || this.$route.name === 'register';
    },
  },
};
</script>

<style lang="stylus">
.cursor--pointer {
  cursor: pointer;
}
.no-select {
  user-select none
}

.custom-elevation,
.v-card,
.v-stepper,
.v-stepper__header,
.v-expansion-panel,
.custom-elevation-2,
.v-btn-toggle--selected,
.v-stepper__header
.v-card.v-card--flat {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.07) !important;
}


#app.v-application .display-4,
#app.v-application .display-3,
#app.v-application .display-2,
#app.v-application .display-1,
#app.v-application .headline,
#app.v-application .title,
#app.v-application .subtitle-1,
#app.v-application .subtitle-2,
#app.v-application .body-1,
#app.v-application .body-2,
#app.v-application .caption,
#app.v-application .overline {
  font-family: "Ubuntu", sans-serif !important;
}

.v-application {
  font-family: "Ubuntu", sans-serif !important;
}
</style>
