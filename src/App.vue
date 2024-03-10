<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activateTab" mode="horizontal" @select="handleSelect" :ellipsis="false">
        <el-menu-item index="arclight">Arclight</el-menu-item>
        <el-menu-item index="downloads">Downloads</el-menu-item>
        <el-menu-item index="docs">Docs</el-menu-item>
        <div style="flex-grow: 1;" />
        <el-menu-item>
          <el-switch v-model="isDark" active-text="深色模式" />
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { ref } from "vue";
import router from "@/router";

type Tabs = "arclight" | "downloads" | "docs";

const activateTab = ref<Tabs>("arclight");

const isDark = useDark();

function handleSelect(key: Tabs): void {
  router.push(`/${key}`);
}

router.push("/arclight");
</script>

<style scoped>

</style>
