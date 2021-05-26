<template>
  <Layout class-prefix="money">
    <!-- {{ record }} -->
    <NumberSection :value.sync="record.amount" @submit="saveRecord" />
    <FormItem
      fieldName="备注"
      placeholder="写点什么吧"
      :value.sync="record.note"
      class="note"
    />
    <TagsSection @update:selected="updateTag" :value="record.tag" />
    <!-- <Tab class-prefix="type" :dataSource="typeList" :value.sync="record.type" /> -->
    <Tab class-prefix="type" :dataSource="typeList" :value.sync="record.type" />
  </Layout>
</template>

<script lang='ts'>
import TagsSection from "@/components/TagsSection.vue";
import FormItem from "@/components/FormItem.vue";
import NumberSection from "@/components/NumberSection.vue";
import Tab from "@/components/Tab.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import typeList from "@/constants/typeList";

@Component({
  components: {
    TagsSection,
    FormItem,
    NumberSection,
    Tab,
  },
})
export default class Money extends Vue {
  record: RecordItem = {
    tag: "",
    note: "",
    type: "-",
    amount: 0,
  };
  typeList = typeList;
  get recordList() {
    return this.$store.state.recordList;
  }
  created() {
    this.$store.commit("fetchRecords");
    this.$store.commit("fetchTags");
    this.record.tag = this.$store.state.tagList[0].name;
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
  updateTag(tag: string) {
    this.record.tag = tag;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
    window.alert("记账成功！");
    this.record.note = "";
    this.record.tag = this.$store.state.tagList[0].name;
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