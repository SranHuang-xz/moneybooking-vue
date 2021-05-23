<template>
  <Layout>
    <div class="navBar">
      <Icon name="back" />
      <span>编辑标签</span>
      <div></div>
    </div>
    <div class="form">
      <FormItem filed-name="标签名" placeholder="dd" />
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import { Component, Vue } from "vue-property-decorator";
import FormItem from "@/components/FormItem.vue";
import Button from "@/components/Button.vue";
@Component({
  components: {
    FormItem,
    Button,
  },
})
export default class extends Vue {
  create() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id[0]);
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style scoped>
.navBar {
  display: flex;
  justify-content: space-between;
  height: 44px;
  align-items: center;
  font-size: 16px;
  background: white;
}
.form {
  margin-top: 12px;
  background: white;
  /* height: 44px; */
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44px -16px;
}
</style>