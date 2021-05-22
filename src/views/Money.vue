<template>
  <!-- <div class="wrapper"> -->
  <Layout class-prefix="money">
    <NumberSection />
    <NoteSection />
    <TagsSection :tags="taglist" />
    <CategorySection />
  </Layout>
  <!-- </div> -->
</template>

<script>
// import Layout from "@/components/Layout.vue";
import TagsSection from "@/components/TagsSection.vue";
import NoteSection from "@/components/NoteSection.vue";
import CategorySection from "@/components/CategorySection.vue";
import NumberSection from "@/components/NumberSection.vue";
export default {
  components: {
    TagsSection,
    NoteSection,
    CategorySection,
    NumberSection,
  },
  name: "Money",
  data() {
    return {
      taglist: ["衣", "食", "住", "行"],
    };
  },
};
</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>