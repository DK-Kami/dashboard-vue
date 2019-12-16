<template>
  <v-form ref="form" @submit.prevent="submit" class="pa-4 pt-0">
    <v-card-title class="headline ma-4 mt-0">
      Авторизация
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="data.login"
        :rules="[rules.required]"
        label="Логин"
        rounded
        filled
      />
      <v-text-field
        v-model="data.password"
        :rules="[rules.required]"
        type="password"
        label="Пароль"
        rounded
        filled
      />
      <v-layout class="mt-n6 mr-4">
        <v-spacer />
        <v-btn
          color="primary"
          :ripple="false"
          x-small
          text
        >Восстановить пароль</v-btn>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="success"
        class="mt-6"
        small
        text
        @click="$emit('change-form')"
      >зарегистрироваться сейчас</v-btn>
      <v-btn
        color="primary"
        type="submit"
        depressed
        outlined
        large
      >Авторизоваться</v-btn>
    </v-card-actions>
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
