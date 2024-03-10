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
          :disabled="!snapshotList.length"
          placeholder="Mod Loader"
          size="large"
          @change="onModLoaderChange"
          class="selection"
        >
          <el-option
            v-for="(loader, index) in snapshotList"
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
                  <div class="download-button-text" v-if="stableFile">{{ stableVersion }}</div>
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
                  <div class="download-button-text" v-if="snapshotFile">{{ snapshotVersion }}</div>
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
          <el-table :data="oldSnapshotList">
            <el-table-column prop="name" label="Version" />
            <el-table-column label="Date">
              <template #default="scope">
                {{ getFileLastModified(scope.row) }}
              </template>
            </el-table-column>
            <el-table-column label="Download">
              <template #default="scope">
                <el-link type="primary" :href="scope.row.link" target="_blank">download</el-link>
              </template>
            </el-table-column>
            <el-table-column label="Copy Link">
              <template #default="scope">
                <el-button type="primary" link @click="clickCopyLink(scope.row.link)">copy</el-button>
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
import { listMinecraftVersion, listOldVersion, listSnapshot, listStable } from "@/api/DownloadApi";
import { FileInfo } from "@/api/DownloadApiTypes";
import semverCompare from "semver/functions/compare";
import useClipboard from "vue-clipboard3";

const minecraftVersionList = ref<FileInfo[]>([]);
const snapshotList = ref<FileInfo[]>([]);
const stableList = ref<FileInfo[]>([]);
const snapshotMap = new Map<string, FileInfo>();
const stableMap = new Map<string, FileInfo>();

const selectedMinecraftVersion = ref<string>();
const selectedModLoader = ref<string>();
const stableFile = ref<FileInfo>();
const snapshotFile = ref<FileInfo>();
const stableVersion = ref<string>();
const snapshotVersion = ref<string>();

const oldSnapshotList = ref<FileInfo>([]);

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

function onMinecraftVersionChange(value: string): void {
  listSnapshot(value)
    .then(resp => {
      snapshotList.value = resp.files;
      snapshotList.value.forEach((file: FileInfo) => snapshotMap.set(file.name, file));
    })
    .catch(error => {
      if (error.toString().includes("404")) {
        snapshotList.value = [];
        snapshotMap.clear();
        return;
      }
      ElMessage({
        message: error,
        type: "error",
      });
    });

  listStable(value)
    .then(resp => {
      stableList.value = resp.files;
      stableList.value.forEach((file: FileInfo) => stableMap.set(file.name, file));
    })
    .catch((error: string) => {
      if (error.toString().includes("404")) {
        stableList.value = [];
        stableMap.clear();
        return;
      }
      ElMessage({
        message: error,
        type: "error",
      });
    });

  selectedModLoader.value = undefined;
  stableFile.value = undefined;
  snapshotFile.value = undefined;

  listOldVersion(selectedMinecraftVersion.value).then(resp => {
    oldSnapshotList.value = resp.files;
  });
}

function onModLoaderChange(value: string): void {
  let keywords: any;

  stableFile.value = stableMap.get(value);
  if (stableFile.value) {
    keywords = stableFile.value.key.split("/");
    stableVersion.value = keywords[keywords.length - 2];
  }

  snapshotFile.value = snapshotMap.get(value);
  if (snapshotFile.value) {
    keywords = snapshotFile.value.key.split("/");
    snapshotVersion.value = keywords[keywords.length - 2];
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
        message: "Link copied successfully",
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
