<template>
  <!-- <div class="wrapper"> -->
  <Layout class-prefix="money">
    <NumberSection />
    <NoteSection />
    <TagsSection />
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
};
</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>