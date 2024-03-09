import { AxiosPromise } from "axios";
import request from "@/axios";

/**
 * list files
 *
 * @param params FileRequest
 */
export function listFiles(params: FileRequest): AxiosPromise<ResponseInfo> {
  return request.get(generateRequestUrl(params));
}

/**
 * 请求参数拼接
 *
 * @param params FileRequest
 */
function generateRequestUrl(params: FileRequest): string {
  let url = "arclight/branches";
  if (!params.branch) { return; }
  url += `/${params.branch}`;
  if (!params.stability) { return; }
  url += `/${params.stability}`;
  if (!params.version) { return; }
  url += `/${params.version}`;
  return url;
}
