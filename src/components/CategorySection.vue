<template>
  <div class="category">
    <ul>
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component } from "vue-property-decorator";
import Vue from "vue";
@Component
export default class category extends Vue {
  type = "-";
  selectType(type: string) {
    if (type !== "-" && type !== "+") {
      throw "unknown type";
    }
    this.type = type;
  }
}
</script>

<style lang="scss" scoped>
.category {
  font-size: 24px;
  background: rgba(163, 163, 214, 0.5);
  > ul {
    display: flex;
    > li {
      width: 50%;
      text-align: center;
      padding: 16px 0;
      position: relative;
      color: gray;
      &.selected {
        color: black;
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
}
</style>