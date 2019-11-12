<template>
  <v-content fluid>
    <the-menu />

    <v-slide-y-transition>
      <v-container fluid class="pa-0">
        <v-layout fill-height justify-center>
          <router-view />
        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </v-content>
</template>

<script>
import TheMenu from './menu';

export default {
  name: 'DefaultLayout',
  components: {
    TheMenu,
  },
};
</script>
