<template>
  <v-form ref="form" @submit.prevent="submit" class="pa-4 pt-0">
    <v-card-title class="headline ma-4 mt-0">
      Регистрация
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="data.nickname"
        :rules="[rules.min('name'), rules.required]"
        label="Отображаемое имя"
        validate-on-blur
        rounded
        filled
      />
      <v-text-field
        v-model="data.email"
        :rules="[rules.email, rules.required]"
        label="Ваша электронная почта"
        validate-on-blur
        rounded
        filled
      />
      <v-text-field
        v-model="data.password"
        :rules="[rules.required]"
        hint="Пароль должен быть больше 8 символов"
        type="password"
        label="Пароль"
        persistent-hint
        validate-on-blur
        rounded
        filled
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="success"
        class="mt-6"
        small
        text
        @click="$emit('change-form')"
      >На форму авторизации</v-btn>
      <v-btn
        color="primary"
        type="submit"
        depressed
        outlined
        large
      >Зарегистрироваться</v-btn>
    </v-card-actions>
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
