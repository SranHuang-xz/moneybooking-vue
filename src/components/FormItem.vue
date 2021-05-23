<template>
  <div class="note">
    <label>
      <span>{{ this.fieldName }}</span>
      <input
        type="text"
        :value="value"
        @input="onChange($event.target.value)"
        :placeholder="placeholder"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop({ default: " " }) readonly value!: string;
  onChange(value: string) {
    this.$emit("update:value", value);
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