<template>
  <div class="`note`">
    <label :class="classPrefix">
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
import { Component, Prop } from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop({ default: " " }) readonly value!: string;
  @Prop(String) classPrefix?: string;
  onChange(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.note {
  background: rgb(244, 246, 245);
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