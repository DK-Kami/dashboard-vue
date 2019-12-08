<template>
  <v-layout fill-height>
    <v-card class="tool-panel">
      <v-layout
        v-if="loading"
        justify-center
        align-center
        fill-height
      >
        <v-progress-circular
          color="accent"
          size="200"
          width="5"
          indeterminate
        />
      </v-layout>


      <v-layout
        v-else-if="deleteMode"
        class="display-1 error--text font-weight-medium"
        justify-center
        align-center
        fill-height
        column
      >
        Включён режим удаления
        <v-btn
          color="error"
          class="mt-5"
          outlined
          large
          @click="changeMode"
        >Выключить</v-btn>
      </v-layout>

      <template v-else>
        <v-card-title>
          <v-layout
            justify-space-between
            align-center
            class="subtitle-1"
          >
            <v-btn
              color="primary"
              small
              text
              @click="refreshStatistic"
            >
              Обновить статистику
              <v-icon small>refresh</v-icon>
            </v-btn>

            <v-btn
              color="error"
              small
              text
              @click="changeMode"
            >
              {{ `В${deleteMode ? 'ы' : ''}ключить режим удаления` }}
              <v-icon small>delete</v-icon>
            </v-btn>
          </v-layout>
        </v-card-title>

        <v-expansion-panels
          v-model="panel"
          accordion
          multiple
        >
          <v-expansion-panel
            v-for="type in statistic"
            :key="type.name"
            
          >
            <v-expansion-panel-header class="title">{{ type.title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider class="mb-3" />
              <v-layout wrap>
                <v-flex
                  v-for="(item, index) in type.data"
                  :key="item.id"
                  :class="type.name === 'counter' ? 'xs4' : 'xs6'"
                  class="pa-3"
                >
                  <select-listener @select="select(type.name, item._id)">
                    <component
                      :type="type.component"
                      :is="type.component"
                      :index="index"
                      :data="item"
                      is-tool-bar
                    />
                  </select-listener>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </v-card>
  </v-layout>
</template>

<script>
import ColumnChart from '@/components/DashboardTools/ColumnChart';
import PieChart from '@/components/DashboardTools/PieChart';
import Counter from '@/components/DashboardTools/Counter';
import TooltipButton from '@/components/TooltipButton';

import SelectListener from '@/components/abstracts/SelectListener';

export default {
  name: 'ToolPanel',

  components: {
    SelectListener,

    TooltipButton,
    ColumnChart,
    PieChart,
    Counter,
  },

  props: {
    deleteMode: Boolean,
    loading: Boolean,
  },

  data: () => ({
    panel: [0, 0, 0],
  }),

  computed: {
    statistic() {
      return this.$store.getters['statistic/getStatistics'];
    },
  },

  methods: {
    async refreshStatistic() {
      this.$emit('set-loading', true);
      await this.$store.dispatch('statistic/refreshStatistic');
      this.$emit('set-loading', false);
    },
    select(name, id) {
      const statisticType = this.statistic.find(s => s.name === name);
      const item = statisticType.data.find(s => s._id === id);
      const element = {
        type: statisticType.name,
        item,
      };

      this.$emit('start-drag', element);
    },
    changeMode() {
      this.$emit('change-mode');
    },
  },
};
</script>

<style>
  .tool-panel {
    height: 100vh;
    width: 100%;
    overflow-y: auto;
  }
</style>
