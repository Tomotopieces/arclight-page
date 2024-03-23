<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activateTab" mode="horizontal" @select="handleSelect" :ellipsis="false">
        <el-menu-item index="home">
          <img style="height: 2rem" src="@/assets/images/logo.png" alt="Arclight" />
          &nbsp;&nbsp;&nbsp;Arclight
        </el-menu-item>
        <el-menu-item index="downloads">Downloads</el-menu-item>
        <el-menu-item>
          <el-link href="https://wiki.izzel.io/s/arclight-docs" target="_blank">Docs</el-link>
        </el-menu-item>
        <div style="flex-grow: 1" />
        <el-menu-item>
          <el-switch v-model="isDark" active-text="Dark Mode" />
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main style="margin: 0 auto; width: 60%; min-width: 45rem;">
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
  // watch route change event
  router.beforeEach(to => {
    const pathArray = to.path.split("/").filter(p => p);
    if (pathArray.length) {
      activateTab.value = pathArray[0];
    } else {
      router.push("/home");
    }
  });
})();

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
    font-family: Poppins, serif;
}
</style>
