<template>
  <v-layout justify-space-around row>
    <v-flex xs5>
      <main-info-card />
    </v-flex>

    <v-flex xs5>
      <v-layout wrap>
        <v-flex xs12>
          <change-password-form />
        </v-flex>

        <v-flex xs12 mt-5>
          <accounts-card />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import ChangePasswordForm from './ChangePasswordForm';
import AccountsCard from './AccountsCard';
import MainInfoCard from './MainInfoCard';

export default {
  name: 'ProfilePage',

  components: {
    ChangePasswordForm,
    MainInfoCard,
    AccountsCard,
  },

  created() {
    console.log('s');
  }
};
</script>

<style></style>