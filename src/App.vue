<template>
  <v-app>
    <login-page />
  </v-app>
</template>

<script>
import LoginPage from './views/LoginPage';

export default {
  name: 'App',
  components: { LoginPage },
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    },
  },
};
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

  
.cursor--pointer {
  cursor: pointer;
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
  box-shadow: 0 20px 20px rgba(48, 52, 59, 0.07) !important;
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
