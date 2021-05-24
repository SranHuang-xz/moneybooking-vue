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
import { Component } from "vue-property-decorator";
import store from "@/store/index2";

@Component({
  components: {
    TagsSection,
    FormItem,
    CategorySection,
    NumberSection,
  },
})
export default class Money extends Vue {
  taglist = store.tagList;
  recordList = store.recordList;
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
    store.createRecord(this.record);
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