<template>
  <Layout>
    <div class="navBar">
      <Icon name="back" @click="goBack" />
      <span>编辑标签</span>
      <div></div>
    </div>
    <div class="form">
      <FormItem
        classPrefix="labelform"
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
@Component({
  components: {
    FormItem,
    Button,
  },
})
export default class EditLabel extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchTags");
    this.$store.commit("setCurrentTag", id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      this.$store.commit("updateTag", { id: this.tag.id, name });
    }
  }
  remove() {
    this.$store.commit("removeTag", this.tag.id);
  }
  goBack() {
    if (!this.tag.name) {
      alert("标签名不能为空");
      return;
    }
    this.$router.back();
  }
}
</script>

<style scoped lang="scss">
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
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44px -16px;
}
::v-deep .labelform {
  background: white;
  margin: 28px 0;
  > span {
    margin: 0 16px;
    white-space: nowrap;
    padding: 12px 0px;
  }
  > input {
    padding: 2px 2px;
    margin-bottom: 2px;
    font-size: 16px;
  }
}
</style>