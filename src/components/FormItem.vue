<template>
  <div class="note">
    <label>
      <span>{{ this.filedName }}</span>
      <input type="text" v-model="value" :placeholder="this.placeholder" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  @Prop({ required: true }) filedName!: string;
  @Prop() placeholder?: string;
  value = "";
  @Watch("value")
  onChange(note: string) {
    this.$emit("update:note", note);
  }
}
</script>

<style lang="scss" scoped>
.note {
  background: rgba(163, 163, 214, 0.1);
  padding: 0 16px;
  font-size: 14px;
  > label {
    display: flex;
    align-items: center;
    > span {
      margin-right: 16px;
      white-space: nowrap;
    }
    > input {
      display: block;
      width: 100%;
      height: 48px;
      background: none;
      border: none;
    }
  }
}
</style>