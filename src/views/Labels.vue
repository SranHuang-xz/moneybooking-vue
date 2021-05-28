<template>
  <Layout>
    <router-link
      :to="`/labels/edit/${tag.id}`"
      v-for="tag in tags"
      :key="tag.id"
      class="tag"
    >
      <span>{{ tag.name }}</span>
      <Icon name="right" />
    </router-link>

    <div class="createTag-wrapper">
      <router-link to="/labels/add">
        <Button>新增标签</Button>
      </router-link>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";

@Component({
  components: {
    Button,
  },
})
export default class Labels extends Vue {
  get tags() {
    return this.$store.state.tagList;
  }
  beforeCreate() {
    this.$store.commit("fetchTags");
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