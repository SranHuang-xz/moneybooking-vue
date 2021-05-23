<template>
  <div class="note">
    <label>
      <span>备注</span>
      <input type="text" v-model="value" placeholder="请填写备注" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
@Component
export default class NoteSection extends Vue {
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
      height: 64px;
      background: none;
      border: none;
    }
  }
}
</style>