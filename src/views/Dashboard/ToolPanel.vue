<template>
  <v-layout fill-height>
    <v-flex xs12>
      <v-card style="height: 100%">
        <v-expansion-panels
          v-model="panel"
          accordion
          multiple
        >
          <v-expansion-panel
            v-for="type in types"
            :key="type.name"
          >
            <v-expansion-panel-header class="title">{{ type.title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider class="mb-3" />
              <v-layout wrap>
                <v-flex
                  v-for="(item, index) in type.data"
                  :key="index"
                  class="pa-3"
                  xs4
                >
                  <component
                    :is="type.component"
                    :data="item"
                  />
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Counter from '@/components/DashboardTools/Counter';

const types = [
  {
    title: 'Статистические данные',
    component: 'Counter',
    name: 'Counter',
    data: [{
      title: 'Baka',
      value: 2,
    },
    {
      title: 'Baka',
      value: 2,
    },
    {
      title: 'Baka',
      value: 2,
    },
    {
      title: 'Baka',
      value: 2,
    }],
  },
];

export default {
  name: 'ToolPanel',
  components: {
    Counter,
  },
  data: () => ({
    panel: [0],
    types,
  }),
};
</script>
