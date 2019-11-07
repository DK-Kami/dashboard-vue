<template>
  <v-card>
    <v-card-title>
      <v-layout justify-center wrap>
        <v-avatar
          class="white--text mt-n12 elevation-10"
          color="accent"
          size="80"
        >{{ user.avatar }}</v-avatar>

        <v-flex xs12 class="text-right mt-n11">
          <tooltip-button
            tooltip="Редактировать"
            icon="edit"
            lighten="1"
            top
          />
        </v-flex>

        <div class="headline mt-4">{{ user.nickname }}</div>
        <v-flex xs12 />
        <div class="subtitle-2 grey--text">{{ user.email }}</div>
      </v-layout>
    </v-card-title>

    <template class="pa-8">
      <v-card-text>
        <v-list>
          <v-list-item v-for="(item, index) in info" :key="index">
            {{ item }}
          </v-list-item>
        </v-list>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import TooltipButton from '@/components/TooltipButton';

export default {
  name: 'MainUserData',
  components: { TooltipButton },
  computed: {
    user() {
      return this.$store.getters['auth/getUser'];
    },
    info() {
      return this.$store.getters['user/getProfileInfo'];
    },
  },
  methods: {
    /// here
  },
};
</script>
