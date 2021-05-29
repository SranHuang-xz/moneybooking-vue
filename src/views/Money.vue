<template>
  <Layout class-prefix="money">
    <NumberSection :value.sync="record.amount" @submit="saveRecord" />
    <div class="x">
      <FormItem
        fieldName="备注"
        placeholder="写点什么吧"
        :value.sync="record.note"
        class="note"
      />
      <FormItem
        fieldName=" "
        type="date"
        :value.sync="record.createAt"
        class="date"
      />
    </div>

    <TagsSection
      @update:selected="updateTag"
      :value="record.tag"
      :type="record.type"
    />
    <Tab
      class-prefix="type"
      :dataSource="typeList"
      :value.sync="record.type"
      @update:value="updateType"
    />
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
import clone from "@/lib/clone";

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
    createAt: new Date().toISOString(),
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
  updateType(type: "+" | "-") {
    this.record.type = type;
    const tagList = clone(this.$store.state.tagList).filter(
      (r: tag) => r.type === type || r.type === "all"
    );
    this.record.tag = tagList[0].name;
  }
  updateTag(tag: string) {
    this.record.tag = tag;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
    window.alert("记账成功！");
    this.record.note = "";
    const tagList = clone(this.$store.state.tagList).filter(
      (r: tag) => r.type === this.record.type || r.type === "all"
    );
    this.record.tag = tagList[0].name;
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
.date {
  width: auto;
  /* height: 33px; */
}
.x {
  /* border: 1px blue solid; */
  display: flex;
  padding: 4px;
  align-items: center;
  /* background: #000; */
}
/* .date {
  border: 1px red solid;
  display: flex;
  align-items: center; */
/* padding: 4px 16px; */

/* > input { */
/* height: 48px; */
/* border: none; */
/* padding: 2px 2px; */
/* margin-bottom: 2px; */
/* font-size: 16px;
  }
} */
</style>