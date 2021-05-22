<template>
  <div class="tag">
    <ol class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ol>
    <div class="new">
      <button>新增标签</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagsSection",
};
</script>

<style lang="scss" scoped>
.tag {
  background: #ffffff;
  flex-grow: 1;
  /* flex-shrink: 1; */
  /* height: 10px; */
  display: flex;
  flex-direction: column-reverse;
  /* align-items: flex-start; */
  overflow: auto;
  padding-bottom: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      background: rgba(90, 92, 201, 0.2);
      border-radius: 18px;
      display: inline-block;
      font-size: 14px;
      padding: 4px 16px;
      margin: 10px 12px;
      color: gray;
      &.selected {
        color: black;
        background: rgba(90, 92, 201, 0.6);
      }
    }
  }
  > .new {
    > button {
      background: none;
      border: none;
      padding: 0 4px;
      border-bottom: 1px solid #333;
      color: #666;
      margin-top: 8px;
    }
  }
}
</style>