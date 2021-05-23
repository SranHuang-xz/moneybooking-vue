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
import model from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";
const recordList = model.fetch();
const tagList = tagListModel.fetch();
import { Component, Watch } from "vue-property-decorator";
import RecordItem from "@/custom";

@Component({
  components: {
    TagsSection,
    NoteSection,
    CategorySection,
    NumberSection,
  },
})
export default class Money extends Vue {
  taglist = tagList;
  // recordList: Record[] = JSON.parse(
  //   window.localStorage.getItem("recordList") || "[]"
  // );
  record: RecordItem = {
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
    const record2: RecordItem = model.clone(this.record);
    recordList.push(record2);
    record2.createAt = new Date();
  }
  @Watch("recordList")
  onRecordListChange() {
    model.save(recordList);
  }
}
</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>