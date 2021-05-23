<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/helper.scss";
body {
  height: 100vh;
  line-height: 1.5;
  font-family: $font-hei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background: #e6e6e6;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
}
ul,
ol,
li {
  list-style: none;
}
:focus {
  outline: none;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
