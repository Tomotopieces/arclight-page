<template>
  <div class="docs-view">
    <el-button size="large" type="primary" @click="clickButton">Wiki Link</el-button>
  </div>
</template>

<script setup lang="ts">
function clickButton(): void {
  window.open("https://wiki.izzel.io");
}
</script>

<style scoped>
.docs-view {
    margin: 0 auto;
}
</style>
