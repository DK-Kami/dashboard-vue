<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card class="py-5 px-8">
      <v-card-title>
        <v-layout wrap justify-space-between>
          <v-flex xs12 class="text-center mb-7">
            <v-tooltip top>
              <template #activator="{ on }">
                <v-avatar
                  color="accent elevation-10 cursor--pointer"
                  size="90"
                  v-on="on"
                  @click="openImageDialog"
                >
                  <v-icon class="white--text">add</v-icon>
                </v-avatar>
              </template>
              Загрузить изображение
            </v-tooltip>
          </v-flex>

          <input
            v-show="false"
            ref="imageUpload"
            accept="image/jpg,image/jpeg,image/png"
            type="file"
            @change="loadImage()"
          >

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
import dialog from '@/helper/mixins/dialog';

export default {
  name: 'EditDialog',
  mixins: [dialog],
  created() {
    this.loadInfoTypes();
  },
  data: vm => ({
    rules: vm.$store.getters.getRules,
    loading: false,
  }),
  computed: {
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

    imageUpload() {
      return this.$refs.imageUpload;
    },
  },
  methods: {
    async loadInfoTypes() {
      this.$store.dispatch('types/loadInfoTypes');
    },
    async saveChanges() {
      this.loading = true;
      const { error } = this.$store.dispatch('user/saveProfile', {
        info: this.currentInfo,
      });
      if (!error) this.dialog = false;
      this.loading = false;
    },

    openImageDialog() {
      this.imageUpload.click();
    },

    loadImage() {
      const file = this.imageUpload.files[0];
      const supportedMimeType = ['jpg', 'jpeg', 'png'];
      const [type, mimeType] = file.type.split('/');
      console.log(type, mimeType);

      if (type === 'image' && supportedMimeType.includes(mimeType)) {
        // const data = new FormData();
        // data.append('uploadFile', file);

        return this.$store.dispatch('user/uploadAvatar', file);
      }

      this.$store.dispatch('notification/set', {
        message: 'Неверный формат файла. Нужно загрузить изображение',
        type: 'error',
      });
    }
  },
};
</script>
