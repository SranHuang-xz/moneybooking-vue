<template>
  <div>
    <Layout>
      <Tab class-prefix="type" :dataSource="typeList" :value.sync="type" />
      <Tab
        class-prefix="interval"
        :dataSource="intervalList"
        :value.sync="interval"
      />
      <div class="data">
        <ol>
          <li v-for="(group, index) in dataList" :key="index">
            <!-- {{ group }} -->
            <ol>
              <h3 class="title">{{ beautify(group.title) }}</h3>
              <li v-for="item in group.items" :key="item.id" class="record">
                <span> {{ item.tag.name }}</span>
                <span>￥{{ item.amount }}</span>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </Layout>
  </div>
</template>

<script lang='ts'>
import dayjs from "dayjs";
import Tab from "@/components/Tab.vue";
import Vue from "vue";
import intervalList from "@/constants/intervalList";
import typeList from "@/constants/typeList";
import { Component } from "vue-property-decorator";
import clone from "@/lib/clone";
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
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYY年M月D日");
    }
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get dataList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList).sort(
      (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
    );
    const groupList = [
      {
        title: dayjs(newList[0].createAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];

    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = groupList[groupList.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), "day")) {
        last.items.push(current);
      } else {
        groupList.push({
          title: dayjs(current.createAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    console.log(groupList);

    return groupList;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
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
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.data {
  overflow: auto;
}
</style>