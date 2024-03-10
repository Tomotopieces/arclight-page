<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activateTab" mode="horizontal" @select="handleSelect" :ellipsis="false">
        <el-menu-item index="home">Arclight</el-menu-item>
        <el-menu-item index="downloads">Downloads</el-menu-item>
        <el-menu-item index="docs">Docs</el-menu-item>
        <div style="flex-grow: 1" />
        <el-menu-item>
          <el-switch v-model="isDark" active-text="深色模式" />
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in" mode="out-in" :duration="0.5">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { ref } from "vue";
import router from "@/router";

const activateTab = ref("");

const isDark = useDark();

/**
 * something like created
 */
(() => {
  handlePath();
})();

function handlePath(): void {
  const pathArray = window.location.pathname.split("/").filter(p => p);
  if (pathArray.length) {
    activateTab.value = pathArray[0];
    return;
  }
  router.push("/home");
  activateTab.value = "home";
}

function handleSelect(key: string): void {
  router.push("/" + key);
}
</script>

<style scoped>
.el-text {
    margin: 1rem 0;
}
</style>

<style>
* {
    font-family: "Microsoft YaHei UI", serif;
}
</style>
