<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card class="py-5 px-8">
      <v-card-title>
        <v-layout wrap justify-space-between>
          <v-flex xs12 class="text-center mb-7">
            <v-tooltip top>
              <template #activator="{ on }">
                <v-avatar
                  color="accent"
                  size="75"
                  v-on="on"
                >
                  <v-icon class="white--text">add</v-icon>
                </v-avatar>
              </template>
              Загрузить изображение
            </v-tooltip>
          </v-flex>

          <v-flex xs5>
            <v-text-field
              v-model="user.nickname"
              :rules="[rules.min('name')]"
              label="Ваше имя"
              rounded
              filled
            />
          </v-flex>

          <v-flex xs5>
            <v-text-field
              v-model="user.email"
              :rules="[rules.email]"
              label="Ваша электронная почта"
              rounded
              filled
            />
          </v-flex>
        </v-layout>
      </v-card-title>

      <v-card-text>
        <div class="title black--text">Ваши данные</div>
        <v-divider />
        <v-layout wrap justify-space-between class="mt-6">
          <v-flex v-for="item in currentInfo" :key="item._id" xs5>
            <v-text-field
              v-model="item.value"
              :label="item.name"
              rounded
              filled
            />
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          small
          text
          @click="dialog = false"
        >Отмена</v-btn>
        <v-btn
          :loading="loading"
          color="primary"
          type="submit"
          depressed
          outlined
          large
          @click="saveChanges"
        >Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditDialog',
  props: {
    value: Boolean,
  },
  created() {
    this.loadInfoTypes();
  },
  data: vm => ({
    rules: vm.$store.getters.getRules,
    loading: false,
  }),
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit('input', newVal);
      },
    },

    user() {
      return this.$store.getters['user/getUserForEdit'];
    },
    infoTypes() {
      return this.$store.getters['types/getInfoTypes'];
    },

    currentInfo() {
      let userInfos = this.user.info;
      if (typeof userInfos === 'string') userInfos = JSON.parse(userInfos);

      return this.infoTypes.map(info => {
        const userInfo = userInfos.find(i => info.name === i.name);
        return {
          type: info._id,
          name: info.name,
          value: userInfo ? userInfo.value : '',
        };
      });
    },
  },
  methods: {
    async loadInfoTypes() {
      this.$store.dispatch('types/loadInfoTypes');
    },
    async saveChanges() {
      this.loading = true;
      const { error } = this.$store.dispatch('user/saveProfile', this.currentInfo);
      if (!error) this.dialog = false;
      this.loading = false;
    },
  },
};
</script>
