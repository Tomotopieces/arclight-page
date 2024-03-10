<template>
  <div class="path-bar">
    <el-text size="large">{{ path }}</el-text>
  </div>
</template>

<script setup lang="ts">
const path = window.location.pathname;
</script>

<style scoped>
</style>

