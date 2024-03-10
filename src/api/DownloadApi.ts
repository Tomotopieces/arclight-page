import service from "@/axios";
import type { FileRequest, ResponseInfo } from "@/api/DownloadApiTypes";

/**
 * list files
 *
 * @param params FileRequest
 */
export function listFiles(params: FileRequest): Promise<ResponseInfo> {
  return service.request({
    url: generateRequestUrl(params),
    method: "GET",
  });
}

/**
 * 请求参数拼接
 *
 * @param {object} params FileRequest
 */
function generateRequestUrl(params: FileRequest): string {
  let url = "/files/arclight/branches";
  if (!params.branch) { return url; }
  url += `/${params.branch}`;
  if (!params.stability) { return url; }
  url += `/${params.stability}`;
  if (!params.version) { return url; }
  url += `/${params.version}`;
  return url;
}
