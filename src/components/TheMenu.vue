<template>
  <v-navigation-drawer
    color="primary"
    class="drawer"
    expand-on-hover
    permanent
    dark
    app
  >
    <template #prepend>
      <v-list two-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar>
              <img :src="user.avatar">
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ user.nickname }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
    <v-divider />

    <v-list dense nav>
      <v-list-item
        v-for="item in menu"
        :key="item.icon"
        :to="item.to"
        class="cursor--pointer"
        ripple
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          color="secondary"
          outlined
          block
          @click="logout"
        >Выход</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
const menu = [
  { icon: 'account_circle', text: 'Профиль', to: '/profile' },
  { icon: 'dashboard', text: 'Дашбоард', to: '/dashboard' },
  // { icon: 'settings', text: 'Настройки', to: '/settings' },
];

export default {
  name: 'TheMenu',
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
