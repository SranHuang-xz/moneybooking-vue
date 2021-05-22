<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <!-- :class="classPrefix && `${classPrefix}-wrapper` -->
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
  /* border: 1px red solid; */
  flex-direction: column;
  height: 100vh;
}
.content {
  flex-grow: 1;
  overflow: auto;
  /* justify-content: end; */
  /* border: 1px green solid; */
}
</style>