<template>
  <div class="wrapper">
    <div class="content"><slot></slot></div>
    <Nav></Nav>
  </div>
</template>

<script>
export default {
  name: "Money",
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  border: 1px red solid;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex-grow: 1;
  overflow: auto;
  border: 1px green solid;
}
</style>