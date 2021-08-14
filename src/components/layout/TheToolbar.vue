<template>
  <v-layout fill-height>
    <v-app-bar color="primary" dark dense>
      <v-layout align-content-center>
        <v-flex>
          <v-layout align-center fill-height>
            UrFS
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
              <v-icon>mdi-view-dashboard-outline</v-icon>
            </v-btn>

            <v-btn
              class="toolbar-button"
              to="/profile"
              primary
              text
            >
              <v-icon>mdi-account-outline</v-icon>
            </v-btn>

            <v-btn
              class="toolbar-button"
              to="/settings"
              primary
              text
            >
              <v-icon>mdi-cog-outline</v-icon>
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
  height: 48px !important;
  border-radius: 0;
}
</style>
