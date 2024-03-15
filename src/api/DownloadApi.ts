import service from "@/axios";
import type { FileRequest, ResponseInfo } from "@/api/DownloadApiTypes";

/**
 * list available minecraft version
 */
export function listMinecraftVersion(): Promise<ResponseInfo> {
  return service.get("/arclight/minecraft");
}

export function listModLoader(minecraftVersion: string): Promise<ResponseInfo> {
  return service.get(`/arclight/minecraft/${minecraftVersion}/loaders`);
}

/**
 * list old version for specific minecraft version
 *
 * @param {{string}} minecraftVersion specific minecraft version
 * @param modloader mod loader name
 */
export function listVersions(minecraftVersion: string, modloader: string): Promise<ResponseInfo> {
  return service.get(`/arclight/minecraft/${minecraftVersion}/loaders/${modloader}/versions-snapshot`);
}
