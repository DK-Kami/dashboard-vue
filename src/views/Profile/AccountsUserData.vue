<template>
  <v-card class="pa-8 py-4">
    <v-card-title class="text-center">
      Подключённые аккаунты
      <v-spacer />

      <tooltip-button
        tooltip="Редактировать"
        icon="edit"
        lighten="1"
        top
        @action="editProfile"
      />
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item v-for="item in contacts" :key="item._id">
          <v-list-item-content>{{ item.name }}</v-list-item-content>

          <v-list-item-content class="align-end">
            <v-list-item-title class="text-right">
              {{ item.value }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import TooltipButton from '@/components/TooltipButton';

export default {
  name: 'AccountsUserData',
  components: { TooltipButton },
  data: () => ({
    isEdit: false,
  }),
  computed: {
    contactsTypes() {
      return this.$store.getters['types/getContactTypes'];
    },
    contacts() {
      return this.$store.getters['user/getUserContacts'];
    },
  },
  methods:{
    async loadContactTypes() {
      this.$store.dispatch('types/loadContactTypes');
    },

    editProfile() {
      if (!this.contactsTypes.length) {
        this.loadContactTypes();
      }
      this.isEdit = true;
    },
  },
};
</script>
