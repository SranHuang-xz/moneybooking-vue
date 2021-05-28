<template>
  <div>
    <Layout>
      <Tab class-prefix="type" :dataSource="typeList" :value.sync="type" />
      <div class="data" v-if="dataList.length > 0">
        <ol>
          <li v-for="(group, index) in dataList" :key="index">
            <ol>
              <h3 class="title">
                {{ beautify(group.title) }}<span>{{ group.total }}</span>
              </h3>
              <li v-for="item in group.items" :key="item.id" class="record">
                <span> {{ item.tag }}</span>
                <span>￥{{ item.amount }}</span>
              </li>
            </ol>
          </li>
        </ol>
      </div>
      <div class="nodata" v-else>目前还没有记账记录哟~</div>
    </Layout>
  </div>
</template>

<script lang='ts'>
import dayjs from "dayjs";
import Tab from "@/components/Tab.vue";
import Vue from "vue";
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
    type GroupList = { title: string; total?: number; items: RecordItem[] }[];
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
      );
    if (newList.length === 0) {
      return [] as GroupList;
    }
    const groupList: GroupList = [
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
    groupList.forEach((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return groupList;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  /* background: white; */
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
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
  /* background: white; */
}
.record {
  background: white;
  @extend %item;
}
.nodata {
  padding: 40px;
  text-align: center;
}
</style>