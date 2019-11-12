<template>
  <v-content fluid>
    <the-menu />
    <notification />

    <v-slide-y-transition>
      <v-container fluid class="pa-0" fill-height>
        <v-layout fill-height justify-center>
          <router-view />
        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </v-content>
</template>

<script>
import Notification from '@/components/Notification';
import TheMenu from './menu';

export default {
  name: 'DefaultLayout',
  components: {
    Notification,
    TheMenu,
  },
};
</script>
