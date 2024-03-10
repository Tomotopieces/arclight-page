<template>
  <div class="downloads-view">
    <path-bar />
    <el-row justify="center">
      <el-col :span="12">
        <el-button type="primary" class="software-option" @click="clickButton('arclight')">Arclight</el-button>
      </el-col>
      <el-col :span="12">
        <el-button class="software-option">lightfall</el-button>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="12">
        <el-button class="software-option">lightcity</el-button>
      </el-col>
      <el-col :span="12">
        <el-button class="software-option">lightfall-client</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

function clickButton(route: string) {
  router.push("/downloads/" + route);
}
</script>

<style scoped>
.el-col {
    max-width: 15rem;
    width: 15rem;
    max-height: 9.5rem;
    height: 9.5rem;
    margin: 5px;
}

.software-option {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    box-shadow: var(--el-box-shadow-light);
}
</style>
