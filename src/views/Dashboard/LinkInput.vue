<template>
  <v-layout justify-center class="mt-7">
    <v-flex xs10>
      <v-text-field
        v-model="url"
        hint="Эта ссылка на вашу статистика в режиме просмотра. Вы можете скопировать эту ссылку и поделиться ей"
        label="Ссылка на вашу статистику"
        class="cursor--pointer"
        :loading="loading || loadinglink"
        persistent-hint
        rounded
        filled
        @click="selectUrlInput"
      >
        <template #append-outer>
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                class="mt-n1"
                v-on="on"
                icon
                @click="regenerateUrl"
              >
                <v-icon>cached</v-icon>
              </v-btn>
            </template>
            Сгенерировать новую ссылку
          </v-tooltip>
        </template>
        <template #append>
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                class="mt-n1"
                v-on="on"
                icon
                @click="copyToClipboard"
              >
                <v-icon>filter_none</v-icon>
              </v-btn>
            </template>
            Скопировать ссылку
          </v-tooltip>
        </template>
      </v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'LinkInput',
  props: {
    loading: Boolean,
  },
  data: () => ({
    loadinglink: false,
  }),
  computed: {
    url() {
      return this.$store.getters['auth/getUrl'];
    },
  },
  methods: {
    async regenerateUrl() {
      this.loadinglink = true;
      await this.$store.dispatch('auth/regenerateUrl');
      this.loadinglink = false;
    },

    async copyToClipboard() {
      await navigator.clipboard.writeText(this.url);
      this.$store.dispatch('notification/set', {
        message: 'Ссылка скопирована в буфер обмена',
        type: 'info',
      })
    },
    selectUrlInput(e) {
      e.target.select();
      this.copyToClipboard();
    },
  },
};
</script>
