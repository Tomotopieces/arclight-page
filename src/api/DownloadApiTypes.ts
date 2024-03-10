/* Request */

/**
 * Stability
 */
export type Stability = "versions-snapshot" | "versions-stable" | "latest-snapshot" | "latest-stable";

/**
 * Request params
 */
export interface FileRequest {
  branch?: string;
  stability?: Stability;
  version?: string;
}

/* Response */

/**
 * File type
 */
export type FileType = "directory" | "object";

/**
 * Response file info
 */
export interface FileInfo {
  key: string;
  name: string;
  lastModified: string;
  link: string;
  permlink?: string;
  type: FileType;
}

/**
 * Response info
 */
export interface ResponseInfo {
  files: FileInfo[];
  key: string;
  lastModified: string;
}
