<template>
  <div class="downloads-view">
    <transition name="el-fade-in">
      <el-container>
        <el-header>
          <path-bar />
        </el-header>
        <el-main>
          <p class="subtitle" style="text-align: center;">Select the software.</p>
          <el-row justify="center">
            <el-col :span="12">
              <el-button type="primary" plain class="software-option" @click="clickButton('arclight')">Arclight</el-button>
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
        </el-main>
      </el-container>
    </transition>
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
    max-width: 12rem;
    width: 12rem;
    max-height: 7rem;
    height: 7rem;
    margin: 10px;
}

.software-option {
    width: 100%;
    height: 100%;
    box-shadow: var(--el-box-shadow-light);
}
</style>
