<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script lang='ts'>
let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  name: "Icon",
  props: ["name"],
};
</script>

<style lang="scss" scoped>
.icon {
  height: 1em;
  width: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>