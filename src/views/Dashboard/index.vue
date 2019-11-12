<template>
  <v-layout fill-height>
    <v-flex grow>
      <v-layout column fill-height>
        <v-flex shrink>
          <link-input />
        </v-flex>

        <v-flex grow>
          <dashboard-panel />
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs4>
      <tool-panel  />
    </v-flex>
  </v-layout>
</template>

<script>
import DashboardPanel from './DashboardPanel';
import LinkInput from './LinkInput';
import ToolPanel from './ToolPanel';

export default {
  name: 'DashboardPage',
  components: {
    DashboardPanel,
    LinkInput,
    ToolPanel,
  },
};
</script>
