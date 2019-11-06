<template>
  <v-content fluid>
    <the-menu />

    <v-slide-y-transition>
      <v-container fluid>
        <v-layout fill-height justify-center>
          <v-flex xs12 xl10 class="px-5 pt-5 mt-5">
            <router-view />
          </v-flex>
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
