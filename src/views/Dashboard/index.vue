<template>
  <v-btn @click="logout">log out</v-btn>
</template>

<script>
export default {
  name: 'DashboardPage',

  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.replace({ name: 'login' });
    }
  }
};
</script>

<style></style>
