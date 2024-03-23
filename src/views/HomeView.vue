<template>
  <div class="arclight-view">
    <h1 class="title">Arclight</h1>
    <p class="subtitle">A Bukkit(1.19/1.20) server implementation in modding environment using Mixin. ⚡ </p>
    <el-button type="primary" @click="clickDownloads">Downloads</el-button>
    <el-button @click="clickDocumentation">Documentation</el-button>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

function clickDownloads(): void {
  router.push("/downloads");
}

function clickDocumentation(): void {
  window.open("https://wiki.izzel.io/s/arclight-docs");
}
</script>

<style scoped>
.arclight-view {
}

.el-button {
    height: 3rem;
    font-size: 1.2rem;
}
</style>
