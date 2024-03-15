<template>
  <div class="arclight-view">
    <el-container>
      <el-header>
        <path-bar />
      </el-header>
      <el-main>
        <h2>Download Arclight</h2>
        <!-- Minecraft version selector -->
        <el-text size="large">Version:&nbsp;</el-text>
        <el-select
          v-model="selectedMinecraftVersion"
          placeholder="Minecraft Version"
          size="large"
          @change="onMinecraftVersionChange"
          class="selection"
        >
          <el-option
            v-for="(version, index) in minecraftVersionList"
            :key="index"
            :label="version.name"
            :value="version.name"
          />
        </el-select>

        <!-- Mod loader selector -->
        <el-text size="large">&nbsp;On:&nbsp;</el-text>
        <el-select
          v-model="selectedModLoader"
          :disabled="!loadersList.length"
          placeholder="Mod Loader"
          size="large"
          @change="onModLoaderChange"
          class="selection"
        >
          <el-option
            v-for="(loader, index) in loadersList"
            :key="index"
            :label="loader.name"
            :value="loader.name"
          />
        </el-select>
      </el-main>

      <!-- Latest download buttons -->
      <transition name="el-fade-in">
        <el-main v-show="selectedMinecraftVersion && selectedModLoader">
          <el-text size="large">Download</el-text>
          <el-row justify="start">
            <el-col :span="8">
              <el-button
                type="success"
                class="download-button"
                :disabled="!stableFile"
                @click="clickDownload(stableFile.link)"
              >
                <div class="download-button-content">
                  <div class="download-button-title">Stable</div>
                  <div class="download-button-text" v-if="stableFile">{{ getFileLastModified(stableFile) }}</div>
                  <div class="download-button-text" v-if="stableFile">{{ stableFile.name }}</div>
                </div>
              </el-button>
            </el-col>
            <el-col :span="8">
              <el-button
                type="success"
                class="download-button"
                :disabled="!snapshotFile"
                @click="clickDownload(snapshotFile.link)"
              >
                <div class="download-button-content">
                  <div class="download-button-title">Latest</div>
                  <div class="download-button-text" v-if="snapshotFile">{{ getFileLastModified(snapshotFile) }}</div>
                  <div class="download-button-text" v-if="snapshotFile">{{ snapshotFile.name }}</div>
                </div>
              </el-button>
            </el-col>
          </el-row>
        </el-main>
      </transition>

      <!-- Old versions -->
      <transition name="el-fade-in">
        <el-main v-show="selectedMinecraftVersion && selectedModLoader">
          <el-text size="large">Old Versions</el-text>
          <el-table :data="snapshotList">
            <el-table-column prop="name" label="Version" />
            <el-table-column label="Date">
              <template #default="scope">
                {{ getFileLastModified(scope.row) }}
              </template>
            </el-table-column>
            <el-table-column label="Download">
              <template #default="scope">
                <el-link type="primary" :href="scope.row.permlink" target="_blank">download</el-link>
              </template>
            </el-table-column>
            <el-table-column label="Copy Link">
              <template #default="scope">
                <el-button type="primary" link @click="clickCopyLink(scope.row.permlink)">copy</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </transition>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { listMinecraftVersion, listModLoader, listVersions } from '@/api/DownloadApi';
import type { FileInfo } from "@/api/DownloadApiTypes";
import semverCompare from "semver/functions/compare";
import useClipboard from "vue-clipboard3";

const minecraftVersionList = ref<FileInfo[]>([]);
const loadersList = ref<FileInfo[]>([]);
const snapshotList = ref<FileInfo[]>([]);

const selectedMinecraftVersion = ref<string>();
const selectedModLoader = ref<string>();
const stableFile = ref<FileInfo>();
const snapshotFile = ref<FileInfo>();

/**
 * Something like created
 */
(async () => {
  const data = await listMinecraftVersion();
  minecraftVersionList.value = data.files
    .sort((a: FileInfo, b: FileInfo) => {
      const aName = a.name.split(".").length < 3 ? a.name + ".0" : a.name;
      const bName = b.name.split(".").length < 3 ? b.name + ".0" : b.name;
      return semverCompare(bName, aName);
    });
})();

function onMinecraftVersionChange(value: string) {
  selectedModLoader.value = undefined;
  loadersList.value = [];
  stableFile.value = undefined;
  snapshotFile.value = undefined;
  snapshotList.value = [];
  listModLoader(value).then(resp => {
    loadersList.value = resp.files;
  });
}

function onModLoaderChange(value: string): void {
  stableFile.value = undefined;
  snapshotFile.value = undefined;
  snapshotList.value = [];
  if (selectedMinecraftVersion.value) {
    listVersions(selectedMinecraftVersion.value, value).then(resp => {
      let sorted = resp.files.sort((a, b) => new Date(b['last-modified']).getTime() - new Date(a['last-modified']).getTime());
      snapshotFile.value = sorted.find(() => true);
      stableFile.value = sorted.find(a => !a.name.includes("-SNAPSHOT"));
      snapshotList.value = sorted;
    });
  }
}

function getFileLastModified(file: FileInfo): string {
  return new Date(file["last-modified"]).toLocaleDateString();
}

function clickDownload(link: string): void {
  window.open(link);
}

function clickCopyLink(link: string): void {
  useClipboard()
    .toClipboard(link)
    .then(() => {
      ElMessage({
        message: "Link copied",
        type: "success",
      });
    });
}
</script>

<style scoped>
.el-col {
  max-width: 12rem;
  width: 12rem;
  max-height: 7rem;
  height: 7rem;
  margin: 20px;
}

.selection {
  width: 240px;
}

.el-button span {
  display: block;
}

.download-button {
  width: 100%;
  height: 100%;
  box-shadow: var(--el-box-shadow-light);
}

.download-button-content {
  width: 100%;
  height: 100%;
}

.download-button-content * {
  margin-bottom: 0.5rem;
}

.download-button-title {
  font-size: large;
  color: white;
}

.download-button-text {
  font-size: small;
  color: white;
}
</style>
