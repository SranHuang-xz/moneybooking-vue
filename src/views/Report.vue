<template>
  <Layout>
    <Tab :dataSource="typeList" :value.sync="type" />
    <div class="main" ref="main" style="width: 100%; height: 300px"></div>
    <div class="chart-wrapper">
      <div class="chart" ref="totalDigital" style="height: 300px"></div>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as echart from "echarts/core";
import Tab from "@/components/Tab.vue";
import day from "dayjs";
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  PieChart,
  LineSeriesOption,
  LineChart,
} from "echarts/charts";
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import typeList from "@/constants/typeList";
import echarts from "echarts";
import dayjs from "dayjs";
import _ from "lodash";
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
>;

// 注册必须的组件
echart.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  PieChart,
  LegendComponent,
  LineChart,
]);

@Component({
  components: {
    Tab,
  },
})
export default class Report extends Vue {
  type = "-";
  typeList = typeList;
  recordList: RecordItem[] = [];
  totalChart: any;
  dayChart: any;
  groupList: GroupList = this.$store.state.groupList;
  getMonthData() {
    const groupList: GroupList = this.$store.state.groupList;
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const date = day(today).subtract(i, "day").format("YYYY-MM-DD");
      const find = _.find(groupList, { title: date });
      array.push({
        date: date,
        value: find ? find.total : 0,
      });
    }
    return array;
  }
  dayChartDraw() {
    let exstance = this.$refs.main as HTMLDivElement;
    if (exstance) {
      if (this.dayChart) {
        echart.dispose(this.dayChart);
      }
    }
    this.dayChart = echart.init(exstance);
    this.dayChart.setOption({
      title: {
        text: "今日数据",
        top: "5%",
        left: "center",
      },
      series: [
        {
          type: "pie",
          radius: "50%",
          avoidLabelOverlap: false,
          animationType: "expansion",
          animationTypeUpdate: "expansion",
          animation: true,
          data: this.getDayData(),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  }
  totalChartDraw() {
    let exstance = this.$refs.totalDigital as HTMLDivElement;
    if (exstance) {
      if (this.totalChart) {
        echart.dispose(this.totalChart);
      }
    }
    this.totalChart = echart.init(this.$refs.totalDigital as HTMLDivElement);
    const array = this.getMonthData();
    this.totalChart.setOption({
      title: { text: "最近一个月", left: "2%" },
      grid: {
        left: "5%",
      },
      xAxis: {
        type: "category",
        let: "0",
        data: array.map((item) => item.date),
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(5);
          },
        },
      },
      yAxis: {
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data: array.map((item) => item.value),
          type: "line",
        },
      ],
    });
  }
  @Watch("type")
  draw() {
    this.$store.commit("updateGroupList", this.type);
    this.$store.commit("fetchGroupList");
    this.dayChartDraw();
    this.totalChartDraw();
  }
  getDayData() {
    let itemList: RecordItem[] = this.$store.state.groupList[0].items;
    if (itemList === []) {
      return [{ name: "d", value: "df" }];
    }
    let data = [];
    const x = itemList.map((r) => _.pick(r, ["tag", "amount"]));
    for (let i = 0; i < x.length; i++) {
      data.push({ name: x[i].tag, value: x[i].amount });
    }
    return data;
  }
  mounted() {
    this.$store.commit("updateGroupList", this.type);
    this.$store.commit("fetchGroupList");
    this.dayChartDraw();
    this.totalChartDraw();
  }
}
</script>

<style scoped lang="scss">
.chart {
  width: 300%;
  &-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>