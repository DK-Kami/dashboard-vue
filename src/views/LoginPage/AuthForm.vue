<template>
  <v-form ref="form" @submit.prevent="submit" style="min-width: 300px">
    <v-text-field
      v-model="data.login"
      :rules="[rules.required]"
      label="Email"
      filled
    />
    <v-text-field
      v-model="data.password"
      :rules="[rules.required]"
      type="password"
      label="Password"
      filled
    />

    <v-layout justify-end>
      <v-btn
        color="primary"
        type="submit"
        depressed
        outlined
        large
      >Log In</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  name: 'AuthForm',

  props: {
    data: {
      type: Object,
      default: () => ({
        password: '',
        login: '',
      }),
    },
    rules: Object,
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit');
      }
    },
  },
};
</script>
