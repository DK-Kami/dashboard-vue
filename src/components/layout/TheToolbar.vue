<template>
  <v-layout fill-height>
    <v-app-bar color="primary" dark>
      <v-layout align-content-center>
        <v-flex>
          <v-layout align-center fill-height>
            <div class="heading-1">UrFS</div>
          </v-layout>
        </v-flex>

        <v-flex>
          <v-layout justify-center>
            <v-btn
              class="toolbar-button"
              to="/dashboard"
              primary
              text
            >
              <v-icon size="28">mdi-view-dashboard-outline</v-icon>
            </v-btn>

            <v-btn
              class="toolbar-button"
              to="/profile"
              primary
              text
            >
              <v-icon size="28">mdi-account-outline</v-icon>
            </v-btn>

            <v-btn
              class="toolbar-button"
              to="/settings"
              primary
              text
            >
              <v-icon size="28">mdi-cog-outline</v-icon>
            </v-btn>

          </v-layout>
        </v-flex>

        <v-flex>
          <v-layout justify-end>
            <v-btn
              class="toolbar-button"
              text
              @click="logout"
            >
              <span class="mx-3">Log out</span> <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-app-bar>
  </v-layout>
</template>

<script>
export default {
  name: 'TheToolbar',

  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.replace({ name: 'login' });
    }
  }
};
</script>

<style lang="scss">
@import "../../plugins/variables/theme.scss";

.toolbar-button {
  height: 64px !important;
  border-radius: 0;
}
</style>
