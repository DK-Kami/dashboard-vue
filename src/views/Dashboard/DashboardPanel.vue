<template>
  <v-layout fill-height justify-center align-center>
    <v-layout wrap class="dashboard-panel">
      <v-flex
        v-for="item in elements"
        :key="item.item._id"
        class="pa-3"
        shrink
      >
        <div style="position: relative; z-index: 1000;" v-if="deleteMode">
          <div style="position: absolute;width: 100%; ">
            <v-layout fill-height align-center justify-end>
              <v-btn depressed icon color="error" large @click="deleteItem(item.item)">
                <v-icon large>close</v-icon>
              </v-btn>
            </v-layout>
          </div>
        </div>

        <component
          :type="item.type"
          :data="item.item"
          :is="item.type"
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

  props: {
    deleteMode: Boolean,
  },

  created() {
    this.loadDashboard();
  },

  data: () => ({
    elements: [],
  }),

  methods: {
    async deleteItem({ _id }) {
      this.elements = this.elements.filter(e => e.item._id !== _id);
      await this.$store.dispatch('statistic/deleteUserStatistic', _id);
    },

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
