<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-form v-model="valid" lazy-validation @submit.prevent="sendToken">
      <v-card class="py-5 px-8">
        <v-card-title class="title px-10">
          {{ account.name }}
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="token"
            :rules="[rules.required]"
            label="Ваш токен"
            hint="Введите ваш уникальный персональный токен-ключ"
            persistent-hint
            rounded
            filled
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            :loading="loading"
            :disabled="!valid"
            color="primary"
            type="submit"
            depressed
            outlined
            large 
          >Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import dialog from '@/plugins/mixins/dialog';

export default {
  name: 'ConnectAccountDialog',
  mixins: [dialog],
  props: {
    account: {
      type: Object,
      default: () => ({
        _id: '',
        name: '',
      }),
    },
  },
  data: vm => ({
    rules: vm.$store.getters.getRules,
    loading: false,
    valid: true,
    token: '',
  }),
  methods: {
    async sendToken() {
      this.loding = true;

      const { error } = await this.$store.dispatch('user/setCurrentUserAccount', {
        account: this.account,
        token: this.token,
      });
      if (!error) {
        this.token = '';
        this.dialog = false;
      }
      this.loding = false;
    },
  },
  watch: {
    'account.value'(newVal) {
      if (newVal) this.token = newVal;
      else token = '';
    }
  }
};
</script>
