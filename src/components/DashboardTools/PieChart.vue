<template>
  <v-card class="text-center elevation-5 white--text no-select">
    <div :id="`${type}-${index}`"></div>
  </v-card>
</template>

<script>
import Highcharts from 'highcharts';

export default {
  name: 'PieChart',
  props: {
    data: {
      type: Object,
    },
    isToolBar: Boolean,
    index: Number,
    type: String,
  },
  mounted() {
    const { title, value } = this.data;
    const data = value.top
      .sort((p, n) => p.value < n.value ? 1 : -1)
      .map(i => ({
        name: i.name,
        y: i.value,
      }));

    const {
      primary,
      accent,
      info,
    } = this.$vuetify.theme.themes.light;

    Highcharts.chart([this.type, this.index].join('-'), {
      chart: {
        height: this.isToolBar ? '125%' : '200%',
        backgroundColor: primary,
        borderWidth: 0,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: title,
        style: {
          color: '#fff'
        }
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      colors: [
        accent,
        info,
      ],
      legend: {
        enabled: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br>{point.y}',
            distance: 5,
            filter: {
              property: 'percentage',
              operator: '>',
              value: 4
            }
          }
        },
        series: {
          borderWidth: 0,
          dataLabels: {
            style: {
              textOutline: 'none',
              color: '#fff'
            },
            enabled: true,
            format: '{point.y}'
          }
        },
      },
      yAxis: {
        title: '',
        labels: {
          style: {
            color: '#fff'
          }
        },
        lineGridColor: info,
        lineColor: info,
      },
      xAxis: {
        type: 'category',
        labels: {
          style: {
            color: '#fff'
          }
        }
      },

      tooltip: {
        headerFormat: '',
        pointFormat: `
          <span style="font-size:11px">{point.name}:</span><br>
          <span style="color:{point.color}"><b>{point.y}</b><br/>
        `
      },

      series: [{
        name: "Языки",
        colorByPoint: true,
        data,
      }],
    });
  },
  methods: {
    formatName(fullName) {
      const name = fullName.split('/')[1];
      if (!this.isToolBar) return name;

      if (name.length > 5) return name.slice(0, 5) + '...';
      return name;
    },
  },
};
</script>
