<template>
  <v-card class="text-center elevation-5 white--text no-select chart-counter" color="accent">
    <div class="text-center display-1 pt-4">{{ data.value }}</div>
    <v-card-text class="body-1 white--text">
      {{ data.title }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    data: {
      type: Object,
      default: {
        title: '',
        type: '',
      },
    },
  },
};
</script>

<style scoped>
  .chart-counter {
    max-width: 180px;
  }
</style>
