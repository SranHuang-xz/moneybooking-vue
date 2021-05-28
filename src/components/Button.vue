<template>
  <button class="button" @click="$emit('click', $event)"><slot /></button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.button {
  background: rgb(92, 180, 141);
  color: black;
  border-radius: 4px;
  border: none;
  padding: 0 16px;
  height: 40px;
  font-size: 16px;
}
</style>