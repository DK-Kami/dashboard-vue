<template>
  <v-toolbar>
    <v-layout>
      <v-flex>hui</v-flex>

      <v-layout justify-center>
        <v-flex
          v-for="item in menu"
          :key="item.icon"
          :to="item.to"
          class="cursor--pointer"
          ripple
        >
          <icon>
            <v-icon>{{ item.icon }}</v-icon>
          </icon>

          <span>{{ item.text }}</span>
        </v-flex>
      </v-layout>

      <v-layout justify-end>
        <div class="pa-2">
          <v-btn
            color="secondary"
            outlined
            block
            @click="logout"
          >Выход</v-btn>
        </div>
      </v-layout>
    </v-layout>
  </v-toolbar>
</template>

<script>
const menu = [
  { icon: 'account_circle', text: 'Профиль', to: '/profile' },
  { icon: 'dashboard', text: 'Дашбоард', to: '/dashboard' },
  // { icon: 'settings', text: 'Настройки', to: '/settings' },
];

export default {
  name: 'TheToolbar',

  data: () => ({
    menu,
  }),

  computed: {
    user() {
      return this.$store.getters['auth/getUser'];
    },
  },

  methods: {
    logout() {
      this.$store.dispatch('logout');
      setTimeout(() => {
        this.$router.replace({ name: 'login' });
      }, 0);
    },
  },
};
</script>

<style></style>
