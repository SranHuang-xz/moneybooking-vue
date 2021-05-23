<template>
  <Layout class-prefix="money">
    {{ record }}
    <NumberSection @update:amount="updateAmount" />
    <NoteSection @update:note="updateNote" />
    <TagsSection :tags.sync="taglist" @update:selected="updateTag" />
    <CategorySection @update:type="updateType" />
  </Layout>
</template>

<script lang='ts'>
import TagsSection from "@/components/TagsSection.vue";
import NoteSection from "@/components/NoteSection.vue";
import CategorySection from "@/components/CategorySection.vue";
import NumberSection from "@/components/NumberSection.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
type Record = {
  tag: string;
  note: string;
  type: "+" | "-";
  amount: number;
};

@Component({
  components: {
    TagsSection,
    NoteSection,
    CategorySection,
    NumberSection,
  },
})
export default class Money extends Vue {
  taglist = ["衣", "食", "住", "行"];
  record: Record = {
    tag: "",
    note: "",
    type: "-",
    amount: 0,
  };
  updateTag(tag: string) {
    this.record.tag = tag;
  }
  updateNote(note: string) {
    this.record.note = note;
  }
  updateType(type: "+" | "-") {
    this.record.type = type;
  }
  updateAmount(amount: string) {
    this.record.amount = parseFloat(amount);
  }
}
</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>