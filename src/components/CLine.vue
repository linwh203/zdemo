<template>
  <div>
    <Line
      :chart-options="props.chartOptions"
      :chart-data="props.chartData"
      :chart-id="props.chartId"
      :dataset-id-key="props.datasetIdKey"
      :plugins="props.plugins"
      :css-classes="props.cssClasses"
      :styles="props.styles"
      :width="props.width"
      :height="props.height"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

// ChartJS.register(ChartDataLabels);

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartId: {
    type: String,
    default: "line-chart",
  },
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 200,
  },
  cssClasses: {
    default: "",
    type: String,
  },
  styles: {
    type: Object,
    default: () => {},
  },
  chartOptions: {
    type: Object,
    default: () => ({
      responsive: true,
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          stacked: false,
          title: {
            display: true,
            text: "OOC",
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "right",
          align: 'start',
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            font: {
              size: 10,
            },
          },
        },
      },
    }),
  },
  plugins: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>