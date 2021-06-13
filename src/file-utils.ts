import { existsSync, rmSync } from "fs";
import { dirname } from "path";

import { deleteEmptyDirectoryRecursive } from "./directory-utils";

export function deleteExistingFile(absoluteFileName: string) {
  if (existsSync(absoluteFileName)) {
    rmSync(absoluteFileName);
    const parentDir = dirname(absoluteFileName);
    deleteEmptyDirectoryRecursive(parentDir);
  }
}
