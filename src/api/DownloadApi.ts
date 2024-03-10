import service from "@/axios";
import type { FileRequest, ResponseInfo } from "@/api/DownloadApiTypes";

/**
 * list available minecraft version
 */
export function listMinecraftVersion(): Promise<ResponseInfo> {
  return service.get("/arclight/minecraft");
}

/**
 * list available snapshot for specific minecraft version
 *
 * @param {{string}} minecraftVersion specific minecraft version
 */
export function listSnapshot(minecraftVersion: string): Promise<ResponseInfo> {
  return service.get(`/arclight/minecraft/${minecraftVersion}/latest-snapshot`);
}

/**
 * list available stable for specific minecraft version
 *
 * @param {{string}} minecraftVersion specific minecraft version
 */
export function listStable(minecraftVersion: string): Promise<ResponseInfo> {
  return service.get(`/arclight/minecraft/${minecraftVersion}/latest-stable`);
}

/**
 * list old version for specific minecraft version
 *
 * @param {{string}} minecraftVersion specific minecraft version
 */
export function listOldVersion(minecraftVersion: string): Promise<ResponseInfo> {
  return service.get(`/arclight/minecraft/${minecraftVersion}/versions-snapshot`);
}
