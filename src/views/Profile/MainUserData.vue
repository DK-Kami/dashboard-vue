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
            @action="editProfile"
          />
        </v-flex>

        <div class="headline mt-4">{{ user.nickname }}</div>
        <v-flex xs12 />
        <div class="subtitle-2 grey--text">{{ user.email }}</div>
      </v-layout>
    </v-card-title>

    <template class="py-8">
      <v-card-text class="px-12">
        <v-list class="px-8">
          <v-list-item v-for="item in info" :key="item._id">
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>

            <v-list-item-action>
              {{ item.value }}
            </v-list-item-action>
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
