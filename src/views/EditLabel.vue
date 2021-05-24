<template>
  <Layout>
    <div class="navBar">
      <Icon name="back" @click="goBack" />
      <span>编辑标签</span>
      <div></div>
    </div>
    <div class="form">
      <FormItem
        :value="tag.name"
        @update:value="update"
        field-name="标签名"
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormItem from "@/components/FormItem.vue";
import Button from "@/components/Button.vue";
// import store from "@/store/index2";
@Component({
  components: {
    FormItem,
    Button,
  },
})
export default class extends Vue {
  tag?: tag = undefined;
  created() {
    //TODO
    // this.tag = store.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      //TODO
      // store.updateTag(this.tag.id, name);
    }
  }
  remove() {
    if (this.tag) {
      //TODO
      // if (store.removeTag(this.tag.id)) {
      //   this.$router.back();
      // }
    }
  }
  goBack() {
    this.$router.back();
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