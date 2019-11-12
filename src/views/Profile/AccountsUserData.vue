<template>
  <v-card class="pa-8 py-4">
    <connect-account-dialog v-model="dialog" :account="selectedAccount" />

    <v-card-title class="text-center">
      Аккаунты
      <v-spacer />
    </v-card-title>

    <v-card-text>
      <v-layout>
        <v-flex
          v-for="account in availableAccounts"
          :key="account.id"
          class="mr-5 cursor--pointer"
          shrink
          @click="connectAccount(account)"
        >
          <v-layout align-center column>
            <v-tooltip top>
              <template #activator="{ on }">
                <v-avatar
                  class="white--text elevation-6"
                  color="accent"
                  size="45"
                  v-on="on"
                >{{ account.name.charAt(0) }}</v-avatar>
              </template>
              Подключить
            </v-tooltip>
            {{ account.name }}
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout v-if="userAccounts.length" column>
        <div class="mt-5 title black--text">
          Уже подключённые
        </div>

        <v-list class="px-8" ripple>
          <v-list-item>
            <v-list-item-content>Аккаунт</v-list-item-content>

            <v-list-item-content class="align-end">
              <v-list-item-title class="text-right">
                Токен доступа
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-for="account in userAccounts" :key="account._id">
            <v-list-item-content>{{ account.name }}</v-list-item-content>

            <v-list-item-content class="align-end">
              <v-list-item-title class="text-right">
                {{ account.value }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <tooltip-button
                tooltip="Редактировать"
                icon="edit"
                @action="connectAccount(account)"
              />
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import ConnectAccountDialog from './ConnectAccountDialog';
import TooltipButton from '@/components/TooltipButton';

export default {
  name: 'AccountsUserData',
  components: {
    ConnectAccountDialog,
    TooltipButton,
  },
  created() {
    this.loadAccounts();
  },
  data: () => ({
    selectedAccount: {},
    dialog: false,
  }),
  computed: {
    accounts() {
      return this.$store.getters['types/getAccounts'];
    },
    availableAccounts() {
      return this.accounts.filter(account => !this.userAccounts.find(a => a.name === account.name));
    },
    userAccounts() {
      return this.$store.getters['user/getUserAccounts'];
    },
  },
  methods:{
    async loadAccounts() {
      this.$store.dispatch('types/loadAccounts');
    },

    connectAccount(selectedAccount) {
      this.selectedAccount = selectedAccount;
      this.dialog = true;
    },

    editProfile() {
      this.isEdit = true;
    },
  },
};
</script>
