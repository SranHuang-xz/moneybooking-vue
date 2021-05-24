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
        <Button @click="createTag">新增标签</Button>
      </div>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import store from "@/store/index2";

@Component({
  components: {
    Button,
  },
})
export default class Labels extends Vue {
  tags = store.tagList;
  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      store.createTag(name);
    } else {
      alert("标签名不能为空");
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  font-size: 16px;
  background: white;
  min-height: 44px;
  display: flex;
  padding-left: 16px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  > .icon {
    margin-right: 16px;
    color: #666;
  }
}
.createTag-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44px -16px;
}
</style>