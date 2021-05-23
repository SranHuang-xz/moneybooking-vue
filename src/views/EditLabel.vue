<template>
  <Layout>
    <div>
      <Icon name="back" />
      <span>编辑标签</span>
      <div></div>
    </div>
    <NoteSection filed-name="标签名" placeholder="dd" />
  </Layout>
</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import { Component, Vue } from "vue-property-decorator";
import NoteSection from "@/components/NoteSection.vue";
@Component({
  components: {
    NoteSection,
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
</style>