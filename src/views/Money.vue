<template>
  <Layout class-prefix="money">
    {{ record }}
    <NumberSection :value.sync="record.amount" @submit="saveRecord" />
    <FormItem
      fieldName="备注"
      placeholder="写点什么吧"
      @update:value="updateNote"
      class="note"
    />
    <TagsSection :tags.sync="taglist" @update:selected="updateTag" />
    <CategorySection @update:type="updateType" />
  </Layout>
</template>

<script lang='ts'>
import TagsSection from "@/components/TagsSection.vue";
import FormItem from "@/components/FormItem.vue";
import CategorySection from "@/components/CategorySection.vue";
import NumberSection from "@/components/NumberSection.vue";
import Vue from "vue";
// import model from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";
const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
import { Component, Watch } from "vue-property-decorator";
import RecordItem from "@/custom";
import recordListModel from "@/models/recordListModel";

@Component({
  components: {
    TagsSection,
    FormItem,
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
  }
  saveRecord() {
    recordListModel.create(this.record);
  }
  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save();
  }
}
</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse;
}
.note {
  margin: 8px 0;
}
</style>