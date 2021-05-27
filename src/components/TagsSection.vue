<template>
  <div class="tag">
    <ol>
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: value === tag.name }"
        @click="selecte(tag.name, type)"
      >
        <Icon :name="`${tag.icon}`" />
        <span class="tagname">{{ tag.name }}</span>
      </li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
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
    if (tag !== null && tag !== "") {
      this.$store.commit("createTags", { name: tag, type });
    } else if (tag === null) {
      return;
    } else {
      alert("标签名不能为空");
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  width: 100%;
  /* border: 1px solid blue; */
  background: #ffffff;
  flex-grow: 1;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  overflow-y: auto;
  > ol {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    /* margin: 12px -8px; */
    > li {
      border-radius: 18px;
      display: flex;
      width: 70px;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      margin: 12px 10px;
      color: gray;
      fill: gray;
      &.selected {
        color: black;
        fill: black;
      }
      .icon {
        font-size: 40px;
      }
      .tagname {
        max-width: 62px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.tag::-webkit-scrollbar {
  display: none;
}
</style>