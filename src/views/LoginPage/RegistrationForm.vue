<template>
  <v-form ref="form" @submit.prevent="submit" style="min-width: 300px">

    <v-text-field
      v-model="data.nickname"
      :rules="[rules.min('name'), rules.required]"
      label="Display name"
      validate-on-blur
      filled
    />
    <v-text-field
      v-model="data.email"
      :rules="[rules.email, rules.required]"
      label="Email"
      validate-on-blur
      filled
    />
    <v-text-field
      v-model="data.password"
      :rules="[rules.required]"
      hint="Password must be more than 8 characters"
      type="password"
      label="Password"
      persistent-hint
      validate-on-blur
      filled
    />

    <v-layout justify-end mt-4>
      <v-btn
        color="primary"
        type="submit"
        depressed
        outlined
        large
      >Register</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  name: 'RegistrationForm',

  props: {
    data: {
      type: Object,
      default: () => ({
        password: '',
        nickname: '',
        email: '',
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
