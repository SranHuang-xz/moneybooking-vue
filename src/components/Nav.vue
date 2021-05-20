<template>
  <div class="nav">
    <router-link to="/labels">标签</router-link>
    <router-link to="/money"
      >记账
      <svg>
        <use xlink:href="#back" />
      </svg>
    </router-link>
    <router-link to="/statistics">统计</router-link>
  </div>
</template>

<script lang="ts">
// let importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
//   requireContext.keys().forEach(requireContext);
// };
// try {
//   importAll(require.context("../asserts/icons", true, /\.svg$/));
// } catch (error) {
//   console.log(error);
// }
import x from "@/assets/icons/money.svg";
console.log(x);

export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
.nav {
  border: 1px blue solid;
}
</style>