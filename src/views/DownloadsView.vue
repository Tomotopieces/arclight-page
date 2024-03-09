<template>
  <div class="downloads-view">
    <el-text>/downloads</el-text>
    <el-row justify="center" :gutter="10">
      <el-col :span="6">
        <el-card>Arclight</el-card>
      </el-col>
      <el-col :span="6">
        <el-card>lightfall</el-card>
      </el-col>
    </el-row>
    <el-row justify="center" :gutter="10">
      <el-col :span="6">
        <el-card>lightcity</el-card>
      </el-col>
      <el-col :span="6">
        <el-card>lightfall-client</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.el-row {
    margin-bottom: 10px;
}
</style>
