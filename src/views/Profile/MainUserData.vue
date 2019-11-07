<template>
  <v-card>
    <v-card-title>
      <v-layout align-center column>
        <v-avatar
          class="white--text mt-n12 elevation-10"
          color="accent"
          size="80"
        >{{ user.avatar }}</v-avatar>

        <v-tooltip top>
          <template #activator="{ on }">
            <div
              class="headline mt-4 ml-6 cursor--pointer"
              @click="editProfile"
              v-on="on"
            >
              {{ user.nickname }}
              <v-icon class="ml-1 grey--text text--lighten-1">edit</v-icon>
            </div>
          </template>
          Редактировать
        </v-tooltip>

        <div class="subtitle-2 grey--text">{{ user.email }}</div>
      </v-layout>
    </v-card-title>

    <template class="py-8">
      <v-card-text class="px-12">
        <v-list class="px-8">
          <v-list-item v-for="item in info" :key="item._id">
            <v-list-item-content>{{ item.name }}</v-list-item-content>

            <v-list-item-content class="align-end">
              <v-list-item-title class="text-right">
                {{ item.value }}
              </v-list-item-title>
            </v-list-item-content>
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
  data: () => ({
    isEdit: false,
  }),
  computed: {
    user() {
      return this.$store.getters['auth/getUser'];
    },
    info() {
      return this.$store.getters['user/getUserInfo'];
    },
    infoTypes() {
      return this.$store.getters['types/getInfoTypes'];
    },
  },
  methods: {
    async loadInfoTypes() {
      this.$store.dispatch('types/loadInfoTypes');
    },

    editProfile() {
      if (!this.infoTypes.length) {
        this.loadInfoTypes();
      }
      this.isEdit = true;
    }
  },
};
</script>
