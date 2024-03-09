/* Request */

/**
 * Stability
 */
type Stability = "versions-snapshot" | "versions-stable" | "latest-snapshot" | "latest-stable";

/**
 * Request params
 */
interface FileRequest {
  branch?: string;
  stability?: Stability;
  version?: string;
}

/* Response */

/**
 * File type
 */
type FileType = "directory" | "object";

/**
 * Response file info
 */
interface FileInfo {
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
interface ResponseInfo {
  files: FileInfo[];
  key: string;
  lastModified: string;
}
