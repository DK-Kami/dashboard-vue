<template>
  <v-layout justify-center>
    <v-flex xs12 xl10 class="px-5 mt-12 pt-12">
      <v-layout justify-space-between>
        <v-flex xs5>
          <main-user-data />
        </v-flex>

        <v-flex xs5>
          <accounts-user-data />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import MainUserData from './MainUserData';
import AccountsUserData from './AccountsUserData';

export default {
  name: 'ProfilePage',
  components: {
    AccountsUserData,
    MainUserData,
  },
  created() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      this.$store.dispatch('user/loadProfile');
    },
  },
};
</script>
