<template>
  <Layout>
    <Tab :dataSource="typeList" :value.sync="type" />
    <div class="main" ref="main" style="width: 100%; height: 300px"></div>
    <div
      class="main"
      ref="totalDigital"
      style="width: 100%; height: 300px"
    ></div>
  </Layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as echart from "echarts/core";
import Tab from "@/components/Tab.vue";
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  PieChart,
  LineSeriesOption,
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
import { ECharts } from "echarts/core";
import echarts from "echarts";
import clone from "@/lib/clone";
import dayjs from "dayjs";
// import EChartOption = echarts.EChartOption;
// import echarts from 'echarts';
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
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
  piedata: {
    name: string;
    value: number;
  }[] = [];
  totalChart: any;
  dayChart: any;
  dayChartDraw() {
    // echarts.dispose(this.$refs.main as HTMLDivElement);
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
          data: this.piedata,
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
    this.totalChart.setOption({
      title: { text: "所有数据", left: "center" },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  }
  @Watch("type")
  draw() {
    this.filterdayData();
    this.dayChartDraw();
    this.totalChartDraw();
  }

  filterdayData() {
    const list = clone(this.recordList).filter((r) => r.type === this.type);
    const now = dayjs();
    let data = [];
    // todo
    let tag = [];
    let amount = [];
    const dayList = list.filter(
      (r) => dayjs(r.createAt).isSame(now, "day") === true
    );
    for (let i = 0; i < dayList.length; i++) {
      tag.push(dayList[i].tag);
      amount.push(dayList[i].amount);
      data.push({ name: dayList[i].tag, value: dayList[i].amount });
    }
    this.piedata = data;
  }
  mounted() {
    this.$store.commit("fetchRecords");
    this.recordList = this.$store.state.recordList;
    this.filterdayData();
    this.draw();
  }
}
</script>

<style scoped lang="scss">
</style>