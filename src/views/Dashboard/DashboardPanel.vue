<template>
  <v-layout fill-height justify-center align-center>
    <v-layout wrap class="dashboard-panel">
      <v-flex
        v-for="(item, index) in elements"
        :key="index"
        class="pa-3"
        shrink
      >
        <component
          :type="item.type"
          :data="item.item"
          :is="item.type"
          :index="index"
        />
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import ColumnChart from '@/components/DashboardTools/ColumnChart';
import PieChart from '@/components/DashboardTools/PieChart';
import Counter from '@/components/DashboardTools/Counter';
import TooltipButton from '@/components/TooltipButton';

export default {
  name: 'DashboardPanel',

  components: {
    TooltipButton,
    ColumnChart,
    PieChart,
    Counter,
  },

  created() {
    this.loadDashboard();
  },

  data: () => ({
    elements: [],
  }),

  methods: {
    addNewElement(data) {
      this.elements.push(data);
    },
    async loadDashboard() {
      const elements = await this.$store.dispatch('statistic/loadDashboard');
      this.elements = elements.map(el => {
        const type = el.name;
        return el.data.map(d => ({
          item: d,
          type,
        }));
      })
        .flat();
    }
  },
};
</script>

<style>
  .dashboard-panel {
    overflow-y: auto;
    height: 88vh;
  }
</style>
