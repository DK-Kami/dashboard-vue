<template>
  <v-layout fill-height justify-center align-center>
    <v-layout wrap>
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
  data: () => ({
    elements: [],
  }),
  methods: {
    addNewElement(data) {
      this.elements.push(data);
      console.log(this.elements);
    },
  },
};
</script>
