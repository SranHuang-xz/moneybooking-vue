<template>
  <div class="tag">
    <ol class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: value === tag.name }"
        @click="selecte(tag.name, type)"
      >
        <Icon :name="`${tag.icon}`" />
        <span class="tagname">{{ tag.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import clone from "@/lib/clone";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class TagsSection extends Vue {
  @Prop(String)
  readonly value!: string;
  @Prop(String)
  readonly type!: string;

  get tagList() {
    const tagList: tag[] = clone(this.$store.state.tagList).filter(
      (r: tag) => r.type === this.type || r.type === "all"
    );
    return tagList;
  }
  created() {
    this.$store.commit("fetchTags");
  }
  selecte(tag: string, type: string) {
    tag === "添加" ? this.create(type) : this.$emit("update:selected", tag);
  }
  create(type: string) {
    const tag = window.prompt("请输入标签名");
    if (!tag) {
      alert("标签名不能为空");
      return;
    }
    this.$store.commit("createTag", { tag, type });
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
      /* background: rgba(90, 92, 201, 0.2); */
      border-radius: 18px;
      border: 1px red solid;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      /* justify-content: center; */
      font-size: 14px;
      padding: 4px 14px;
      margin: 8px 12px;
      color: gray;
      fill: gray;
      &.selected {
        color: black;
        fill: black;
        /* background: rgba(90, 92, 201, 0.6); */
      }
      .icon {
        font-size: 36px;
      }
      .tagname {
        text-align: center;
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