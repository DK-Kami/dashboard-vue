<template>
  <v-app>
    <login-page v-if="isLogin" />
    <anonim-dashboard v-else-if="isAnonimDashboard" />

    <default-layout v-else />
  </v-app>
</template>

<script>
import AnonimDashboard from './views/AnonimDashboard.vue';
import LoginPage from './views/LoginPage';
import DefaultLayout from './Layout';

export default {
  name: 'App',
  components: {
    AnonimDashboard,
    DefaultLayout,
    LoginPage,
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login' || this.$route.name === 'register';
    },
    isAnonimDashboard() {
      return this.$route.name === 'AnonimDashboard';
    },
  },
};
</script>

<style lang="stylus">
.cursor--pointer {
  cursor: pointer;
}
.cursor--grab {
  cursor: grab;
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
