<template>
  <div class="numpad">
    <div class="output">{{ output }}</div>
    <div class="buttonpad">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="sub">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="remove">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent" class="dot">.</button>
    </div>
  </div>
</template>


<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
@Component
export default class NumberSection extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement; //强制指定类型
    const input = button.textContent!;
    if (this.output.length === 16) {
      return false;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    this.output += input;
  }
  remove() {
    this.output = "0";
  }
  sub() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  ok() {
    if (this.output === "0") {
      alert("金额不能为0");
      return;
    }
    const number = parseFloat(this.output);
    this.$emit("update:value", number);
    this.$emit("submit", number);
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numpad {
  display: flex;
  flex-direction: column;
  > .output {
    background: white;
    font-size: 36px;
    line-height: 64px;
    text-align: right;
    padding: 0 16px;
  }
  > .buttonpad {
    @extend %clearFix;
    > button {
      float: left;
      width: 25%;
      height: 64px;
      font-size: 18px;
      border: none;
      &.ok {
        height: 128px;
        float: right;
      }
      &.zero {
        width: 50%;
      }
      &.dot {
        width: 25%;
      }
      &:nth-child(1) {
        background: rgba(90, 92, 201, 0.4);
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: rgba(90, 92, 201, 0.5);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: rgba(90, 92, 201, 0.6);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10),
      &:nth-child(13) {
        background: rgba(90, 92, 201, 0.7);
      }
      &:nth-child(8),
      &:nth-child(11) {
        background: rgba(90, 92, 201, 0.8);
      }
      &:nth-child(12) {
        background: #5a5cc9;
      }
      &:nth-child(14) {
        background: rgba(90, 92, 201, 0.9);
      }
    }
  }
}
</style>