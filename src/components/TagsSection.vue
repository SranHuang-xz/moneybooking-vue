<template>
  <div class="tag">
    <ol class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: selectedTag === tag }"
        @click="selecte(tag)"
      >
        {{ tag.name }}
      </li>
    </ol>
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class TagsSection extends Vue {
  selectedTag = "";
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
  }
  selecte(tag: string) {
    this.selectedTag = tag;
    this.$emit("update:selected", this.selectedTag);
  }
  create() {
    const tag = window.prompt("请输入标签名");
    if (!tag) {
      alert("标签名不能为空");
      return;
    }
    this.$store.commit("createTag", tag);
  }
}
</script>

<style lang="scss" scoped>
.tag {
  background: #ffffff;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  padding-bottom: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      background: rgba(90, 92, 201, 0.2);
      border-radius: 18px;
      display: inline-block;
      font-size: 14px;
      padding: 4px 16px;
      margin: 10px 12px;
      color: gray;
      &.selected {
        color: black;
        background: rgba(90, 92, 201, 0.6);
      }
    }
  }
  > .new {
    > button {
      background: none;
      border: none;
      padding: 0 4px;
      border-bottom: 1px solid #333;
      color: #666;
      margin-top: 8px;
    }
  }
}
</style>