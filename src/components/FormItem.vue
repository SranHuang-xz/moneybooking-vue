<template>
  <div class="note">
    <label :class="classPrefix">
      <template v-if="type === 'date'">
        <span>{{ this.fieldName }}</span>
        <input
          :type="type || 'text'"
          :value="x(value)"
          @input="onChange($event.target.value)"
          :placeholder="placeholder"
        />
      </template>
      <template v-else>
        <span>{{ this.fieldName }}</span>
        <input
          :type="type || 'text'"
          :value="value"
          @input="onChange($event.target.value)"
          :placeholder="placeholder"
        />
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop({ default: " " }) readonly value!: string;
  @Prop() type?: string;
  @Prop(String)
  classPrefix?: string;
  onChange(value: string) {
    this.$emit("update:value", value);
  }
  x(isostring: string) {
    return dayjs(isostring).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
.note {
  background: rgb(244, 246, 245);
  font-size: 14px;
  > label {
    display: flex;
    align-items: center;
    padding: 0 16px;
    > span {
      margin-right: 16px;
      white-space: nowrap;
    }
    > input {
      display: block;
      width: 100%;
      height: 32px;
      background: none;
      border: none;
    }
  }
}
</style>