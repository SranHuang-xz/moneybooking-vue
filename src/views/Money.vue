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
    <TagsSection />
    <Tab :data-source="typeList" :value.sync="record.type" />
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
    this.$store.commit("createRecord", this.record);
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