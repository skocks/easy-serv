import { existsSync, mkdirSync, statSync, readdirSync, rmdirSync } from "fs";
import { dirname } from "path";

export function assertDirectory(absoluteDirectoryName: string) {
  if (!existsSync(absoluteDirectoryName)) {
    mkdirSync(absoluteDirectoryName, { recursive: true });
  }
}

export function deleteEmptyDirectoryRecursive(absoluteDirectoryName: string) {
  const exists = existsSync(absoluteDirectoryName);
  if (!exists) {
    return;
  }
  const isDir = statSync(absoluteDirectoryName).isDirectory();
  if (!isDir) {
    return;
  }

  var files = readdirSync(absoluteDirectoryName);
  if (files.length == 0) {
    rmdirSync(absoluteDirectoryName);
    const parentDir = dirname(absoluteDirectoryName);
    deleteEmptyDirectoryRecursive(parentDir);
  }
}
