<template>
  <div class="downloads-view">
    <path-bar />
    <el-row justify="space-around">
      <el-col v-for="(file, index) in files" :key="index" :span="6">
        <el-card>
          <template #header>
            <el-button type="primary" link @click="clickFilename(file.link)">{{ file.name }}</el-button>
          </template>
          <el-descriptions :column="1">
            <el-descriptions-item label="Key">{{ file.key }}</el-descriptions-item>
            <el-descriptions-item label="Type">{{ file.type }}</el-descriptions-item>
            <el-descriptions-item v-if="file.permlink" label="permlink">{{ file.permlink }}</el-descriptions-item>
          </el-descriptions>
          <template #footer> Last modified：{{ getLastModifiedDate(file["last-modified"]) }} </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { listFiles } from "@/api/DownloadApi";
import { ref } from "vue";
import { FileInfo } from "@/api/DownloadApiTypes";

const params = {};

const files = ref<FileInfo[]>();

async function inquireFiles() {
  const data = await listFiles(params);
  files.value = data.files;
}

function getLastModifiedDate(dateStr: string): string {
  let date = new Date(dateStr);
  return date.toUTCString();
}

function clickFilename(link: string): void {}

inquireFiles();
</script>

<style scoped>
.el-col {
  padding: 36px 120px;
}
</style>
