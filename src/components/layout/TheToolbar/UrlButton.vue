<template>
  <v-text-field
    :value="url"
    class="url-button"
    readonly
    rounded
    filled
    dense
  >
    <template #append>
      refresh
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'UrlButton',

  computed: {
    url() {
      return this.$store.getters['auth/getUrl'];
    },
  },
};
</script>

<style lang="scss">
  .url-button {
    .v-text-field__details {
      display: none !important;
    }
  }
</style>
