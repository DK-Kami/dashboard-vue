<template>
  <v-layout fill-height>
    <v-flex v-if="loading">
      <v-card style="height: 100%">
        <v-layout fill-height align-center justify-center>
          <v-progress-circular
            color="accent"
            size="200"
            width="5"
            indeterminate
          />
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12 v-else>
      <v-card style="height: 100%">
        <v-card-title>
          <v-layout align-center justify-space-between>
            <v-flex shrink class="cursor--pointer">
              <span class="primary--text font-weight-light">Обновить статистику</span>
              <tooltip-button
                tooltip="Обновить статистику"
                color="primary"
                icon="refresh"
                bottom
                @action="refreshStatistic"
              />
            </v-flex>

            <v-flex shrink class="cursor--pointer">
              <tooltip-button
                :tooltip="`В${deleteMode && 'ы'}ключить режим удаления`"
                icon="delete"
                color="error"
                bottom
                @action="changeMode"
              />
              <span class="error--text font-weight-light">{{ deleteMode ? 'Прекратить' : 'Режим удаления' }}</span>
            </v-flex>
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
      </v-card>
    </v-flex>
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
    refreshStatistic() {
      this.$emit('set-loading', true);
      this.$store.dispatch('statistic/refreshStatistic');
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
