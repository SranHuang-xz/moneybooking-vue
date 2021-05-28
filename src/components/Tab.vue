<template>
  <ul class="types">
    <li
      v-for="item in dataSource"
      :key="item.value"
      @click="select(item)"
      :class="liClass(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
type dataSourceItem = { text: string; value: string };
@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array })
  dataSource!: dataSourceItem[];
  @Prop(String)
  readonly value!: string;
  @Prop(String)
  classPrefix?: string;
  liClass(item: dataSourceItem) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }

  select(item: dataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style scoped lang='scss'>
.types {
  font-size: 24px;
  background: rgb(92, 180, 141, 0.4);
  display: flex;
  > li {
    width: 50%;
    text-align: center;
    padding: 14px 0;
    position: relative;
    color: gray;
    &.selected {
      color: black;
      background: rgb(92, 180, 141);
    }
    &.selected::after {
      content: "";
      display: block;
      height: 3px;
      background: #333;
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
    }
  }
}
</style>