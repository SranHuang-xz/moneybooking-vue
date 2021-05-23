<template>
  <div>
    <Layout>
      <ol>
        <router-link
          :to="`/labels/edit/${tag.id}`"
          v-for="tag in tags"
          :key="tag.id"
          class="tag"
        >
          <span>{{ tag.name }}</span>
          <Icon name="right" />
        </router-link>
      </ol>
      <div class="createTag-wrapper">
        <button class="createTag" @click="createTag">新增标签</button>
      </div>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Layout from "@/components/Layout.vue";
import tagListModel from "@/models/tagListModel";
import Vue from "vue";
import { Component } from "vue-property-decorator";
tagListModel.fetch();
@Component
export default class Labels extends Vue {
  tags = tagListModel.data;
  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      const success = tagListModel.create(name);
      if (success) {
        alert("添加成功");
      } else {
        alert("该标签名已存在");
      }
    } else {
      alert("标签名不能为空");
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  font-size: 16px;

  min-height: 44px;
  display: flex;
  margin-left: 16px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  > .icon {
    margin-right: 16px;
    color: #666;
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  padding: 0 16px;
  height: 40px;
  font-size: 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44px -16px;
  }
}
</style>