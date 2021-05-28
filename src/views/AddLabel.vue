<template>
  <Layout>
    <div class="navBar">
      <Icon name="back" @click="goBack" />
      <span>添加标签</span>
      <div></div>
    </div>
    <div class="show">
      <div class="span">选择的标签是：{{ this.selectedTag }}</div>
      <div class="button-wrapper">
        <Button @click="ensure">确定</Button>
      </div>
    </div>
    <div class="tag">
      <ol>
        <li
          v-for="tag in defaultTags"
          :key="tag.id"
          @click="chooseTag(tag.name)"
          :class="{ selected: selectedTag === tag.name }"
        >
          <Icon :name="`${tag.icon}`" />
          <span class="tagname">{{ tag.name }}</span>
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TagsSection from "@/components/TagsSection.vue";
import Button from "@/components/Button.vue";
import clone from "@/lib/clone";
@Component({
  components: {
    TagsSection,
    Button,
  },
})
export default class AddLabel extends Vue {
  name = "addlabels";
  selectedTag = "";
  y: tag[] = [];
  get defaultTags() {
    this.y = [];
    const defaultTags: tag[] = this.$store.state.defaultTags;
    const tagList: tag[] = this.$store.state.tagList;
    console.log(defaultTags);
    console.log(tagList);
    // let x: tag[] = [];

    for (let i = 0; i < defaultTags.length; i++) {
      for (let j = 0; j < tagList.length; j++) {
        if (defaultTags[i].name === tagList[j].name) {
          break;
        }
        if (j === tagList.length - 1) {
          this.y.push(defaultTags[i]);
        }
      }
    }
    // if (this.selectedTag == "") {
    //   this.selectedTag = this.y[0].name;
    // }
    return this.y;
  }
  chooseTag(tag: string) {
    this.selectedTag = tag;
  }
  created() {
    this.$store.commit("fetchTags");
  }
  ensure() {
    // console.log(this.selectedTag);

    if (this.selectedTag === "") {
      alert("请至少选择一个标签");
    } else {
      const x = clone(this.y).filter((r) => r.name === this.selectedTag);
      this.$store.commit("createTags", {
        name: x[0].name,
        type: x[0].type,
        icon: x[0].icon,
      });
      this.selectedTag = "";
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style scoped lang="scss">
.navBar {
  display: flex;
  justify-content: space-between;
  height: 44px;
  align-items: center;
  font-size: 16px;
  background: white;
}

.button-wrapper {
  text-align: center;
  padding: 4px 16px;
  margin-right: 24px;
  /* margin-top: 44px -16px; */
}
.show {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag {
  width: 100%;
  background: #ffffff;
  flex-grow: 1;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  overflow-y: auto;
  > ol {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    /* margin: 12px -8px; */
    > li {
      border-radius: 18px;
      display: flex;
      width: 70px;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      margin: 12px 10px;
      color: gray;
      fill: gray;
      &.selected {
        color: black;
        fill: black;
      }
      .icon {
        font-size: 40px;
      }
      .tagname {
        max-width: 62px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.tag::-webkit-scrollbar {
  display: none;
}
</style>