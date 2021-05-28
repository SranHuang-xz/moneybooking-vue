<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav />
  </div>
</template>

<script>
export default {
  props: ["classPrefix"],
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #e6e6e6;
}
.content {
  flex-grow: 1;
  overflow: auto;
  -ms-overflow-style: none;
}
.content::-webkit-scrollbar {
  display: none;
}
</style>