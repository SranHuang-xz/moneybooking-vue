<template>
  <div>
    <Layout>
      <Tab class-prefix="type" :dataSource="typeList" :value.sync="type" />
      <Tab
        class-prefix="interval"
        :dataSource="intervalList"
        :value.sync="interval"
      />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Tab from "@/components/Tab.vue";
import Vue from "vue";
import intervalList from "@/constants/intervalList";
import typeList from "@/constants/typeList";
import { Component } from "vue-property-decorator";
@Component({
  components: {
    Tab,
  },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  typeList = typeList;
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  align-items: center;
  height: 52px;
  font-size: 22px;
}
</style>